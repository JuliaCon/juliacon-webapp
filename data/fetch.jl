using HTTP, JSON

include("viz_data_preprocess.jl")

function order!(d)
  sort_key = "code" in keys(d[1]) ? "code" : "id"
  sort!(d, by = x -> x[sort_key])
end

for resource in ("rooms", "talks", "speakers")
  resp = HTTP.get("https://pretalx.com/api/events/juliacon2020/$(resource)?limit=500")
  data = JSON.parse(String(resp.body))
  if (data["next"] !== nothing || data["previous"] !== nothing)
    error("Failed to fetch all $(resource)!")
  end
  open("$(resource).json", "w") do io
    order!(data["results"])
    JSON.print(io, data["results"], 1)
    if resource == "talks"
      viz_data_preprocess(data["results"])
    end
  end
  @info "Got $(length(data["results"])) $(resource)"
end

@info "Success!"
