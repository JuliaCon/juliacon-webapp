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

const YOUTUBE_CODES_2023 = [
  Dict(  # Day 1
    "32-144" => "x9d6WtePul0",
    "32-141" => "rMrHCM1Etng",
    "32-D463 (Star)" => "gpo1FUXCcJE",
    "32-124" => "Hkta_AEv5sA",
    "32-123" => "CrIAsPmG2a0",
    "32-G449 (Kiva)" => "CoY5XwmFkF4",
    "26-100" => "vG6ZLhe9Hns",
  ),
  Dict(  # Day 2
    "32-144" => "imZE2k7gJ0Q",
    "32-082" => "jIlRpohTr4U",
    "32-D463 (Star)" => "V8wiKuApmKU",
    "32-124" => "-rtaL3qavBA",
    "32-123" => "5i48gvpqJYY",
    "32-G449 (Kiva)" => "6JBCCLVREwk",
    "26-100" => "3AFiBLHlG1A",
  ),
  Dict(  # Day 3
    "32-144" => "x9d6WtePul0",
    "32-155" => "rMrHCM1Etng",
    "32-D463 (Star)" => "gpo1FUXCcJE",
    "32-124" => "Hkta_AEv5sA",
    "32-123" => "CrIAsPmG2a0",
    "32-G449 (Kiva)" => "CoY5XwmFkF4",
    "26-100" => "vG6ZLhe9Hns",
  ),
]

function download_videos_2023(talks)
    results = []
    for talk in talks
      slot = talk["slot"]
      day_id = parse(Int, slot["end"][9:10]) - 25
      if day_id == 0 || day_id > 3
          continue
      end
      rx = r"(Ceremony|Keynote|Minisymposium|[Tt]alk\b)"
      if !isnothing(match(rx, talk["submission_type"]["en"])) && talk["track"]["en"] != "ASE60"
        id = talk["code"]
        room = slot["room"]["en"]
        room == "Online talks and posters" && continue
        youtubeCode = YOUTUBE_CODES_2023[day_id][room]
        push!(results, Dict("id"=>id, "youtubeCode"=>youtubeCode, "live"=>true))
      end
    end
    @info "Fetched $(length(results)) video entries"
    json_string=json(results, 1)
    json_string = replace(json_string, "\u2028" => "")
    open("videos.json", "w") do io
      write(io, json_string)
    end
end

# download_videos()

# @info "Success downloading Video data!"
