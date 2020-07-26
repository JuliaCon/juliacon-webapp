import React from "react";
import { css } from "emotion";
import { isFuture } from "date-fns";
import {
  Tabs,
  TabList,
  TabsOrientation,
  Tab,
  TabPanels,
  TabPanel,
} from "@reach/tabs";

import { TalkType } from "../../apollo/__generated__/types";
import { now } from "../../utils/time";
import { invariant } from "../../utils/invariant";

import { Link, StyledMarkdown } from "../core";
import { VSpace } from "../layout";
import { TalkByline, TalkYouTubeEmbed } from "../talk";

import { useLiveTalks } from "./useLiveTalks";
import { LiveTalksTalkFragment } from "./LiveTalks.generated";
import { LiveTalksPlaceholder } from "./LiveTalksPlaceholder";

export const LiveTalksView = () => {
  const [time, setTime] = React.useState(() => now());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(now()), 1000);
    return () => clearInterval(interval);
  });

  const talks = useLiveTalks(time);

  if (talks.length === 0) {
    return <LiveTalksPlaceholder />;
  }

  return (
    <div>
      <TalkSelectionTabs talks={talks} />
    </div>
  );
};

type TalksList = readonly LiveTalksTalkFragment[];
interface TalkSelectionTabsProps {
  talks: TalksList;
}
const TalkSelectionTabs = React.memo(function TalkSelectionTabs({
  talks,
}: TalkSelectionTabsProps) {
  // Knowing that there is at least one active talk makes our life easier below.
  invariant(
    !!talks.length,
    `Cannot render empty talks list in TalkSelectionTabs component`
  );
  const fallbackRoomId = talks[0].room.id;

  // We need to decouple the active "room" from the tab index since the tabs
  // may change over time (e.g. the "green" room might change from tab index 2
  // to 1 if one room is no longer hosting talks) and we want to typically keep
  // the user in the same room when the transitions occur.
  // The edge case here is when a room that the user is currently in goes idle.
  // In that case, trying to lookup the associated tab index fails and we just
  // default to the first room.
  const [roomId, setRoomId] = React.useState(fallbackRoomId);
  const tabIndex = getIndexByRoom(talks, roomId) || 0;

  // If the room goes idle, set the room to the fallback value
  React.useEffect(() => {
    if (tabIndex === null) setRoomId(fallbackRoomId);
  }, [fallbackRoomId, tabIndex]);

  // When the user click a tab, we need to lookup the index of that tab and
  // translate it into a room id
  const onTabChange = React.useCallback(
    (index: number) => {
      setRoomId(getRoomByIndex(talks, index) || fallbackRoomId);
    },
    [fallbackRoomId, talks]
  );

  const tabs = talks.map((talk) => <TalkTab talk={talk} />);
  const panels = talks.map((talk) => (
    <TabPanel key={talk.id}>
      <TalkPanel active={talk.room.id === roomId} talk={talk} />
    </TabPanel>
  ));

  return (
    <Tabs
      orientation={TabsOrientation.Vertical}
      index={tabIndex || 0}
      onChange={onTabChange}
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
      `}
    >
      <TabList>{tabs}</TabList>
      <TabPanels>{panels}</TabPanels>
    </Tabs>
  );
});

function getRoomByIndex(talks: TalksList, index: number): string | null {
  const talk = talks[index];
  if (!talks.length) {
    return null;
  }
  // If there is no talk at that index (this shouldn't usually happen?), we just
  // return the first room.
  if (!talk) {
    return talks[0].room.id;
  }
  return talk.room.id;
}

function getIndexByRoom(talks: TalksList, roomId: string) {
  const roomIndex = talks.findIndex((talk) => talk.room.id === roomId);
  if (roomIndex === -1) return null;
  return roomIndex;
}

const TalkTab = ({ talk }: { talk: LiveTalksTalkFragment }) => {
  return (
    <Tab
      key={talk.id}
      className={css`
        &[data-reach-tab] {
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
              width: 0.5rem;
              height: 100%;
              background-color: ${talk.room.color || "#cccccc"};
            }
          }
        }
      `}
    >
      <p>{talk.title}</p>
    </Tab>
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
  const zoomReminder = talk.type === TalkType.WorkshopHalfDay &&
    isFuture(new Date(talk.endTime)) && (
      <>
        <VSpace />
        <div
          className={css`
            border-left: 4px solid var(--julia-purple);
            padding-left: 1rem;
          `}
        >
          <p>
            You can engage with the workshop presenter in real time on Zoom!
            Please check your email for a list of Zoom links to join the
            discussion (or{" "}
            <a href={"https://juliacon.org/2020/tickets/"}>
              register for JuliaCon
            </a>{" "}
            if you haven't).
          </p>
        </div>
      </>
    );
  return (
    <div
      className={css`
        padding: 1rem;
        overflow: auto;
      `}
    >
      {
        // We need to not mount the YouTube embed until the tab has actually
        // been opened (so that the autoseek works as expected)
        active && <TalkYouTubeEmbed autoplay talk={talk} />
      }

      <VSpace />
      <h1
        className={css`
          font-size: 1.5rem;
          font-family: "Patua One", sans-serif;
        `}
      >
        <Link href={"/talk/[id]"} as={`/talk/${talk.id}`}>
          {talk.title}
        </Link>
      </h1>
      <VSpace />
      <TalkByline talk={talk} />
      <VSpace />
      {talk.abstract && <StyledMarkdown source={talk.abstract} />}
      {zoomReminder || null}
    </div>
  );
};
