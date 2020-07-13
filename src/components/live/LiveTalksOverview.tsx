import React from "react";
import { css } from "emotion";
import { format } from "date-fns";
import {
  Tabs,
  TabList,
  TabsOrientation,
  Tab,
  TabPanels,
  TabPanel,
} from "@reach/tabs";

import { now } from "../../utils/time";
import { Center } from "../layout";
import { useLiveTalks } from "./useLiveTalks";
import { LiveTalksTalkFragment } from "./LiveTalks.generated";
import YouTube from "react-youtube";

export const LiveTalksView = () => {
  const [time, setTime] = React.useState(() => now());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(now()), 1000);
    return () => clearInterval(interval);
  });

  const talks = useLiveTalks(time);
  const [index, setIndex] = React.useState(0);

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
  const [mountTime, setMountTime] = React.useState<Date | null>(null);

  // Reset the value of mountTime whenever the value of active changes
  React.useEffect(() => {
    if (active) {
      setMountTime(now());
    } else {
      setMountTime(null);
    }
  }, [active]);

  if (!active || !mountTime) return null;

  // Calculate the offset into the video that we should be starting at.
  // Note that we purposefully don't want to start at the beginning to try to
  // encourage conference attendees to engage in "real time" as if they were at
  // a physical conference. They will still be able to seek back to the
  // beginning of the video if they are so inclined.
  // We divide by 1000 since JS stores times in ms and we only want seconds.
  const youtubeStart =
    (mountTime.getTime() - new Date(talk.startTime).getTime()) / 1000;

  const video = talk.videoCode ? (
    <YouTube
      videoId={talk.videoCode}
      opts={{
        playerVars: { autoplay: 1, modestbranding: 1, start: youtubeStart },
      }}
    />
  ) : null;
  return (
    <div
      className={css`
        padding: 1rem;
      `}
    >
      <p>{talk.title}</p>
      {video}
    </div>
  );
};
