module DiscordBot

using Dates: DateTime, Millisecond, UTC, now, @dateformat_str

using Discord: BotClient, create_message
using JSON3: JSON3

const DATA_DIR = joinpath(@__DIR__, "..", "..", "data")
const DATETIME_FORMAT = dateformat"yyyy-mm-ddTHH:MM:SSZ"

discord_client() = BotClient(ENV["DISCORD_TOKEN"])

function load_channels()
    data = open(JSON3.read, joinpath(DATA_DIR, "discord.json"))
    return Dict(ch.name => (; id=ch.channelId, color=ch.color) for ch in data.channels)
end

function load_talks()
    talks = open(JSON3.read, joinpath(DATA_DIR, "talks.json"))
    buckets = Dict{DateTime, Vector{JSON3.Object}}()
    for talk in talks
        start = DateTime(talk.slot.start, DATETIME_FORMAT)
        push!(get!(() -> [], buckets, start), talk)
    end
    return sort(collect(buckets); by=first)
end

function format_message(talk, color)
    description = talk.description
    if length(description) > 2000
        description = description[1:1994] * " [...]"
    end

    fields = [(; name="More info", value="https://juliacon2020.now.sh/live")]
    speakers = map(s -> s.name, talk.speakers)
    if !isempty(speakers)
        pushfirst!(fields, (; name="Presented by", value=join(speakers, ", ")))
    end

    embed = Dict(
        :title => talk.title,
        :description => description,
        :author => (; name="Starting now!"),
        :color => color,
        :fields => fields,
    )

    if talk.image !== nothing
        embed[:thumbnail] = (; url=talk.image)
    end

    return (; embed=embed)
end

function send_message(client, channels, talk)
    channel = get(channels, talk.slot.room.en, channels["General"])
    message = format_message(talk, get(channel, :color, channels["General"].color))
    try
        create_message(client, channel.id; message...)
    catch ex
        @warn "Sending message failed" exception=(ex, catch_backtrace())
    end
end

function main()
    client = discord_client()
    channels = load_channels()
    for (start, talks) in load_talks()
        wait = max(start - now(UTC), zero(Millisecond))
        @info "Waiting $wait until $start"
        sleep(wait)
        @info "Alerting"
        for talk in talks
            send_message(client, channels, talk)
        end
    end
end

end

if abspath(PROGRAM_FILE) == @__FILE__
    DiscordBot.main()
end
