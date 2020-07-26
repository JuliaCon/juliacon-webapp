using HTTP, JSON

include("postersessions.jl")
include("viz_data_preprocess.jl")

function order!(d)
  if isempty(d)
    return d
  end
  sort_key = "code" in keys(d[1]) ? "code" : "id"
  sort!(d, by = x -> x[sort_key])
end

# Pretalx has a bug where sometimes strings are returned as string literals and
# sometimes they're returned as "localized bundles" (in our case, just a dict
# with an "en" key). It's not consistent even in the same field
# (e.g., `submission_type` includes both strings and localized bundles), so we
# need this little helper.
normalize_string(s::String) = s
normalize_string(d::Dict) = d["en"]

function fetch_pretalx(filter_fn::Function, resource; out_file=resource, token=nothing)
  headers = if token !== nothing
    ["Authorization" => "Token $token"]
  else
    []
  end
  resp = HTTP.get(
    "https://pretalx.com/api/events/juliacon2020/$(resource)?limit=500",
    headers,
  )
  data = JSON.parse(String(resp.body))
  if (data["next"] !== nothing || data["previous"] !== nothing)
    error("Failed to fetch all $(resource)!")
  end
  results = order!(filter!(filter_fn, data["results"]))
  if out_file !== nothing
      open("$(out_file).json", "w") do io
        JSON.print(io, results, 1)
      end
  end
  @info "Got $(length(results)) $(out_file)"
  return results
end

fetch_pretalx(resource) = fetch_pretalx((elt) -> true, resource)

fetch_pretalx("rooms")
fetch_pretalx("speakers")

talks = fetch_pretalx("talks") do talk
  talk_type = normalize_string(talk["submission_type"])
  return talk_type !== "Poster"
end
viz_data_preprocess(talks)

# For now, posters aren't officially published, so we're we can't access them
# from the Pretalx public API.
token = get(ENV, "PRETALX_TOKEN", nothing)
if token === nothing
    @warn "Skipping updating posters..."
else
  fetch_pretalx("submissions"; out_file="posters", token=token) do talk
    talk_type = normalize_string(talk["submission_type"])
    return talk_type === "Poster" && talk["state"] == "confirmed"
  end
end

using CSV

youtube_code(url::String) = split(url, "/")[end]
youtube_code(::Missing) = nothing

video_codes = Dict(
    v.code => youtube_code(v.youtube_url)
    for v in CSV.File("videos.csv")
)
open("videocodes.json", "w") do io
    data = Dict(
        "videoCodes" => video_codes,
    )
    JSON.print(io, data, 1)
end

@info "Success!"
