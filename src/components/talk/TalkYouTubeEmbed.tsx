import { LiveTalksTalkFragment } from "../live/LiveTalks.generated";
import React from "react";
import { now } from "../../utils/time";
import YouTube from "react-youtube";
import { isPast } from "date-fns";

interface TalkYouTubeEmbedProps {
  talk: LiveTalksTalkFragment;
  autoplay?: boolean;
}
export const TalkYouTubeEmbed = ({ autoplay, talk }: TalkYouTubeEmbedProps) => {
  const [mountTime] = React.useState<Date>(() => now());

  /*
   * When the YouTube player is mounted, we seek to the position in the video
   * where the user should be as if they joined the talk live.
   *
   * Note: There's also a `start` playerVar but it doesn't always work (e.g. if
   * the user has already watched part of the video and comes back, it will
   * resume where they left off).
   */
  const onReady = React.useCallback(
    (event: any) => {
      // Live videos don't require seeking to a specific time.
      // If the video is past the end time, we also don't want to seek into it.
      if (talk.isLive || isPast(new Date(talk.endTime))) return;

      // Calculate the offset into the video that we should be starting at.
      // Note that we purposefully don't want to start at the beginning to try to
      // encourage conference attendees to engage in "real time" as if they were at
      // a physical conference. They will still be able to seek back to the
      // beginning of the video if they are so inclined.
      // We divide by 1000 since JS stores times in ms and we only want seconds.
      const youtubeStart =
        (mountTime.getTime() - new Date(talk.startTime).getTime()) / 1000;

      // Don't seek forward if we're at the start of a video. This is necessary
      // since it can take a few seconds for the YouTube video to fire the ready
      // event and we don't want to always start talks 5 seconds in.
      if (youtubeStart < 10) {
        return;
      }

      event.target.seekTo(youtubeStart);
    },
    [mountTime, talk.endTime, talk.isLive, talk.startTime]
  );

  if (!talk.videoCode) {
    return <p>Unable to load video for this talk.</p>;
  }
  return (
    <YouTube
      videoId={talk.videoCode}
      onReady={onReady}
      opts={{
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          modestbranding: 1,
        },
      }}
    />
  );
};
