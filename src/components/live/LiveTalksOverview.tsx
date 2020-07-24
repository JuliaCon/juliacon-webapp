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
import { invariant } from "../../utils/invariant";
import { TalkType } from "../../apollo/__generated__/types";

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
      <Center>{format(time, "yyyy-MM-dd HH:mm")}</Center>
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

  const tabs = talks.map((talk) => <Tab key={talk.id}>{talk.title}</Tab>);
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
  const zoomReminder = talk.type === TalkType.WorkshopHalfDay && (
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
          discussion (or register for JuliaCon on Eventbrite) if you haven't.
        </p>
      </div>
    </>
  );
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
      {zoomReminder || null}
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
      // Live videos don't require seeking to a specific time
      if (talk.isLive) return;

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
    [mountTime, talk.isLive, talk.startTime]
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
