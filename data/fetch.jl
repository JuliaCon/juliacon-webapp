using HTTP, JSON

for resource in ("rooms", "talks", "speakers")
  resp = HTTP.get("https://pretalx.com/api/events/juliacon2020/$(resource)?limit=500")
  data = JSON.parse(String(resp.body))
  if (data["next"] !== nothing || data["previous"] !== nothing)
    error("Failed to fetch all $(resource)!")
  end
  open("$(resource).json", "w") do io
    JSON.print(io, data["results"], 1)
  end
  @info "Got $(length(data["results"])) $(resource)"
end

@info "Success!"
