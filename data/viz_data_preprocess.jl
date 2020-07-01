using TextAnalysis

# data wrangling and nlp for viz
function viz_data_preprocess(data)
    talks = []
    index = 1
    for talk in data
        if talk["duration"] < 100
            push!(talks, parse_talk(talk, index))
            index += 1
        end
    end

    # save json for schedule viz
    open("../src/assets/vega/sched_viz_data.json", "w") do io
        JSON.print(io, talks, 1)
    end

    corpus = get_corpus(talks)
    # save json for word cloud viz
    open("../src/assets/vega/wordcloud_viz_data.json", "w") do io
        JSON.print(io, corpus, 1)
    end

end

function parse_talk(d, index)
    parsed = Dict{String, Any}()
    parsed["index"] = index
    parsed["id"] = d["code"]
    parsed["title"] = d["title"]
    parsed["url"] = "/talk/$(parsed["id"])"
    parsed["speaker"] = join(map(x -> x["name"], d["speakers"]), ", ")
    parsed["start_datetime"] = d["slot"]["start"]
    parsed["end_datetime"] = d["slot"]["end"]
    parsed["duration"] = d["duration"]
    parsed["location"] = d["slot"]["room"]["en"]
    parsed["text"] = d["title"] * " " * d["abstract"] * " " * d["description"]

    return parsed
end

function get_corpus(data)
    # create the corpus
    sds = map(x -> StringDocument(x["text"]), data)
    corpus = Corpus(sds)

    # clean up the data
    url_regex = r"(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
    remove_patterns!(corpus, url_regex)
    prepare!(corpus, strip_case| strip_articles| strip_non_letters| strip_stopwords| strip_pronouns| strip_indefinite_articles| strip_definite_articles| strip_prepositions| strip_html_tags| strip_whitespace)
    remove_words!(corpus, ["julia", "jl", "talk", "using"]) # too common :(

    # set up the lexicon
    lexicon(corpus)
    update_lexicon!(corpus)

    # light stemming - combine simple 's' plurals with their singular (e.g. models == model)
    pairs = Pair{String, String}[]
    for (k, v) in lexicon(corpus)
        if k[end] == 's' && haskey(lexicon(corpus), k[1:end-1])
            push!(pairs, k => k[1:end-1])
        end
    end

    # replace plurals and update the lexicon
    for doc in corpus
        for pair in pairs
            doc.text = replace(doc.text, pair)
        end
    end
    update_lexicon!(corpus)

    # set up inverse index
    inverse_index(corpus)
    update_inverse_index!(corpus)

    # bi-grams - find common two word phrases
    bg = NGramDocument[]

    for d in corpus
        push!(bg, NGramDocument(ngrams(d, 2), 1, d.metadata))
    end

    bg_corpus = Corpus(bg)

    # set up inverse index
    inverse_index(bg_corpus)
    update_inverse_index!(bg_corpus)

    # set up the lexicon
    lexicon(bg_corpus)
    update_lexicon!(bg_corpus)

    # tri-grams - find common three word phrases

    tg = NGramDocument[]

    for d in corpus
        push!(tg, NGramDocument(ngrams(d, 3), 1, d.metadata))
    end

    tg_corpus = Corpus(tg)

    # set up inverse index
    inverse_index(tg_corpus)
    update_inverse_index!(tg_corpus)

    # set up the lexicon
    lexicon(tg_corpus)
    update_lexicon!(tg_corpus)

    # combine ngrams and find most commone words and phrases
    tg_cut_off = 2
    bg_cut_off = 3
    ug_cut_off = 18

    new_tg = remove_ngrams(lexicon(tg_corpus), tg_cut_off)
    new_bg = remove_ngrams(lexicon(bg_corpus), new_tg, bg_cut_off)
    new_ug = remove_ngrams(lexicon(corpus), new_bg, ug_cut_off)

    # turn the n-grams into tabular data for plotting
    word_data = NamedTuple{(:text, :count, :talks), Tuple{String, Int, Array}}[]
    for (word, count) in new_ug
        inds = []
        word_len = length(split(word))
        if word_len == 3
            inds = inverse_index(tg_corpus)[word]
        elseif word_len == 2
            inds = inverse_index(bg_corpus)[word]
        else
            inds = inverse_index(corpus)[word]
        end
        push!(word_data, NamedTuple{(:text, :count, :talks), Tuple{String, Int, Array}}((word, count * word_len^2, inds)))
    end

    return word_data
end

# get overall count of a term in the n+1 gram's dictionary
function subgram_count(term, np1grams)
    count = 0
    for (k, v) in np1grams
        if occursin(term, k)
            count += v
        end
    end

    return count
end

# prune and combine an n gram with it's n+1 gram given a cut off count
function remove_ngrams(ngrams, np1grams, cut_off)
    new_ngrams = Dict{String, Int}()
    for (k, v) in ngrams
        new_count = v - subgram_count(k, np1grams)
        if new_count > cut_off
            new_ngrams[k] = new_count
        end
    end

    return merge(new_ngrams, np1grams)
end

function remove_ngrams(ngrams, cut_off)
    new_ngrams = Dict{String, Int}()
    for (k, v) in ngrams
        if v > cut_off
            new_ngrams[k] = v
        end
    end

    return new_ngrams
end
