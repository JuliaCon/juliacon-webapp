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
const TalkSelectionTabs = ({
  talks,
  index,
  onChange,
}: TalkSelectionTabsProps) => {
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
};

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
  if (!active) return null;
  return (
    <div
      className={css`
        padding: 1rem;
      `}
    >
      <p>{talk.title}</p>
    </div>
  );
};
