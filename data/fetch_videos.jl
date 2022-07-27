using Pkg
Pkg.activate(@__DIR__)

using Airtable, JSON

function download_videos()
    base_id = "appAeQFpa0ywisJKd"
    base = AirBase(base_id)
    tbl = AirTable("Video data", base)
    r = Airtable.query(tbl)
    @info "Read $(length(r)) records from Airtable"
    results = []
    for i in 1:length(r)
      x = r[i]
      id =  get(x, Symbol("Pretalx ID"), "")
      youtubeCode = get(x, Symbol("Youtube ID"), "")
      live = get(x, Symbol("Live"), false)
      if !isempty(id) && !isempty(youtubeCode)
          push!(results, Dict("id"=>id, "youtubeCode"=>youtubeCode, "live"=>live))
      end
    end
    @info "Fetched $(length(results)) video entries"
    json_string=json(results, 1)
    json_string = replace(json_string, "\u2028" => "")
    open("videos.json", "w") do io
      write(io, json_string)
    end
end

download_videos()

@info "Success downloading Video data!"

include("extract-experiences.jl")

@info "Finished extracting experience talks!"
