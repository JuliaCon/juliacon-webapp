using JSON

load_json(file) = open(io->JSON.parse(read(io, String)), file)
data = load_json("all-sessions.json")

exs = filter(x->x["Session type"]["en"] == "Experience", data)

vids = load_json("videos.json")

idset = Set(map(x->x["ID"], exs))

ex_vids = [vids[findfirst(x->x["id"] == id, vids)]
           for id in map(x->x["ID"], exs)]

using Dates

exs

experience_slot = filter(load_json("talks.json")) do t
    t["title"] == "Juliacon Experiences"
end |> only

start_time = experience_slot["slot"]["start"]
end_time = experience_slot["slot"]["end"]
fmt = dateformat"yyyy-mm-ddTHH:MM:SSZ"
slots = DateTime(start_time, fmt):Dates.Minute(3):DateTime(end_time,fmt)

experiences = map(exs, ex_vids, slots) do ex, vid, t
    Dict(
         "id" => vid["id"],
         "title" => ex["Proposal title"],
         "videoCode" => vid["youtubeCode"],
         "abstract" => ex["Abstract"],
         "speakerIds" => ex["Speaker IDs"],
         "startTime" => string(t,"Z"),
         "endTime" => string(t + Dates.Minute(3), "Z"))
end

experiences = sort(experiences, by=x->x["id"])

open("experiences.json", "w") do io
    write(io, JSON.json(experiences))
end

#=
  {
    "id": "7VNJWV",
    "title": "Fitting Plate-reader Curves with Julia",
    "videoCode": "eNGPMIqhiPI",
    "abstract": "PlateReaderCore and PlateReaderCurves are Julia packages for fitting and visualizing results from optical plate-readers and similar equipment. The presentation will introduce these packages and describe my experience developing and deploying them.",
    "speakerIds": [
      "UPFEMA"
    ],
    "startTime": "2021-07-29T16:30:00.000Z",
    "endTime": "2021-07-29T16:34:00.000Z"
  },
=#
