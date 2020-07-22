module DiscordBot

using Base: @kwdef

using Dates: DateTime, Millisecond, UTC, now, @dateformat_str

using Discord: BotClient, create_message
using JSON3: JSON3

const DATETIME_FORMAT = dateformat"yyyy-mm-ddTHH:MM:SSZ"
const DATA_DIR = joinpath(@__DIR__, "..", "..", "data")

discord_client() = BotClient(ENV["DISCORD_TOKEN"])

function load_channels()
    data = open(JSON3.read, joinpath(DATA_DIR, "discord.json"))
    return Dict(ch.name => ch.channelId for ch in data.channels)
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

function format_message(talk)
    # TODO: A cute embed.
    title = talk.title
    speakers = isempty(talk.speakers) ? "None" : join(map(s -> s.name, talk.speakers), ", ")
    content = """
        Starting now!
        **$title**
        By $speakers
        More info: <https://juliacon2020.now.sh/live>
        """
    return (; content=content)
end

function send_message(client, channels, talk)
    channel = get(channels, talk.slot.room.en, channels["General"])
    message = format_message(talk)
    try
        create_message(client, channel; message...)
    catch ex
        @warn "Sending message failed" exception=(ex, catch_backtrace())
    end
end

function main()
    client = discord_client()
    channels = load_channels()
    for (start, talks) in load_talks()
        wait = max(start - now(UTC), Millisecond(0))
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
