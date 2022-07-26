using JSON

load_json(file) = open(io->JSON.parse(read(io, String)), file)
data = load_json("all-sessions.json")

exs = filter(x->x["Session type"]["en"] == "Experience", data)

vids = load_json("videos.json")

idset = Set(map(x->x["ID"], exs))

ex_vids = [findfirst(x->x["id"] == id, vids)
           for id in map(x->x["ID"], exs)]

using Dates

exs
#=

map(exs, ex_vids) do ex, vid
    if vid == nothing
        @show ex
    end
    Dict(
         "id" => vid["id"],
         "title" => ex["Proposal title"],
         "videoCode" => vid["youtubeCode"],
         "abstract" => ex["Abstract"],
         "startTime" => now(),
         "endTime" => now())
end
=#
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
