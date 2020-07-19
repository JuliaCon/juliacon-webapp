import React from "react";
import { css } from "emotion";
import { format } from "date-fns";
import YouTube, { Options as YTOptions } from "react-youtube";
import {
  Tabs,
  TabList,
  TabsOrientation,
  Tab,
  TabPanels,
  TabPanel,
} from "@reach/tabs";

import { now } from "../../utils/time";
import { Center, VSpace } from "../layout";
import { useLiveTalks } from "./useLiveTalks";
import { LiveTalksTalkFragment } from "./LiveTalks.generated";
import { LiveTalksPlaceholder } from "./LiveTalksPlaceholder";
import { Link } from "../core";

export const LiveTalksView = () => {
  const [time, setTime] = React.useState(() => now());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(now()), 1000);
    return () => clearInterval(interval);
  });

  const talks = useLiveTalks(time);
  const [index, setIndex] = React.useState(0);

  if (talks.length === 0) {
    return <LiveTalksPlaceholder />;
  }

  return (
    <div>
      <Center>{format(time, "yyyy-MM-dd HH:mm")}</Center>
      <TalkSelectionTabs index={index} talks={talks} onChange={setIndex} />
    </div>
  );
};

interface TalkSelectionTabsProps {
  talks: readonly LiveTalksTalkFragment[];
  index: number | undefined;
  onChange: (index: number) => void;
}
const TalkSelectionTabs = React.memo(function TalkSelectionTabs({
  talks,
  index,
  onChange,
}: TalkSelectionTabsProps) {
  const tabs = talks.map((talk) => <Tab key={talk.id}>{talk.title}</Tab>);
  const panels = talks.map((talk, talkIndex) => (
    <TabPanel key={talk.id}>
      <TalkPanel active={index === talkIndex} talk={talk} />
    </TabPanel>
  ));

  return (
    <Tabs
      orientation={TabsOrientation.Vertical}
      index={index}
      onChange={onChange}
      className={css`
        &[data-reach-tabs] {
          display: grid;
          grid-template-columns: 16rem 1fr;
        }

        [data-reach-tab-list] {
          display: flex;
          flex-flow: column nowrap;
          background: none;
        }

        [data-reach-tab] {
          display: block;
          padding: 1em;
          position: relative;
          background-color: transparent;
          transition: background-color 0.3s;
          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }

          &[data-selected] {
            border: none;
            &:before {
              content: " ";
              position: absolute;
              left: 0;
              top: 0;
              width: 4px;
              height: 100%;
              background-color: var(--julia-purple);
            }
          }
        }
      `}
    >
      <TabList className={css``}>{tabs}</TabList>
      <TabPanels>{panels}</TabPanels>
    </Tabs>
  );
});

interface TalkPanelProps {
  talk: LiveTalksTalkFragment;

  /*
   * Normally, we would just let reach hide and show the panels as it deems
   * appropriate, but since we want to do more complex stuff (like start playing
   * a video when the user opens the tab), we need to pass the active state as
   * a prop here.
   */
  active: boolean;
}
const TalkPanel = ({ active, talk }: TalkPanelProps) => {
  return (
    <div
      className={css`
        padding: 1rem;
      `}
    >
      <Center>
        {
          // We need to not mount the YouTube embed until the tab has actually
          // been opened (so that the autoseek works as expected)
          active && <TalkYouTubeEmbed talk={talk} />
        }
      </Center>
      <VSpace />
      <h1
        className={css`
          font-size: 1.5rem;
        `}
      >
        <Link href={"/talk/[id]"} as={`/talk/${talk.id}`}>
          {talk.title}
        </Link>
      </h1>
      <VSpace />
      <p>{talk.abstract}</p>
    </div>
  );
};

interface TalkYouTubeEmbedProps {
  talk: LiveTalksTalkFragment;
}
const TalkYouTubeEmbed = ({ talk }: TalkYouTubeEmbedProps) => {
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
      // Calculate the offset into the video that we should be starting at.
      // Note that we purposefully don't want to start at the beginning to try to
      // encourage conference attendees to engage in "real time" as if they were at
      // a physical conference. They will still be able to seek back to the
      // beginning of the video if they are so inclined.
      // We divide by 1000 since JS stores times in ms and we only want seconds.
      const youtubeStart =
        (mountTime.getTime() - new Date(talk.startTime).getTime()) / 1000;
      event.target.seekTo(youtubeStart);
    },
    [mountTime, talk.startTime]
  );

  if (!talk.videoCode) {
    return <p>Unable to load video for this talk.</p>;
  }
  return <YouTube videoId={talk.videoCode} onReady={onReady} opts={YT_OPTS} />;
};

const YT_OPTS: YTOptions = {
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
  },
};
