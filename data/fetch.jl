using Pkg
Pkg.activate(@__DIR__)

using HTTP, JSON

include("fetch_videos.jl")
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
    "https://pretalx.com/api/events/juliacon2023/$(resource)?limit=500",
    headers,
  )
  data = JSON.parse(String(resp.body))
  if (data["next"] !== nothing || data["previous"] !== nothing)
    error("Failed to fetch all $(resource)!")
  end
  results = order!(filter!(filter_fn, data["results"]))
  if out_file !== nothing
    json_string = json(results, 1)
    json_string = replace(json_string, "\u2028" => "")
    open("$(out_file).json", "w") do io
      write(io, json_string)
    end
  end
  @info "Got $(length(results)) $(out_file)"
  return results
end
token = get(ENV, "PRETALX_TOKEN", nothing)

fetch_pretalx(resource; kw...) = fetch_pretalx((elt) -> true, resource; kw...)

fetch_pretalx("rooms"; token=token)
fetch_pretalx("speakers"; token=token)

talks = fetch_pretalx("talks"; token=token) do talk
  talk_type = normalize_string(talk["submission_type"])
  return talk_type !== "Poster"
end
download_videos_2023(talks)
viz_data_preprocess(talks)

# For now, posters aren't officially published, so we're we can't access them
# from the Pretalx public API.

if token === nothing
    @warn "Skipping updating posters..."
else
  fetch_pretalx("submissions"; out_file="posters", token=token) do talk
    talk_type = normalize_string(talk["submission_type"])
    return talk_type === "Poster" && talk["state"] == "confirmed"
  end
end

@info "Success!"
