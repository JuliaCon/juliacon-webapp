import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsOrientation,
} from "@reach/tabs";
import { isAfter, isBefore, parseISO } from "date-fns";
import { css } from "emotion";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { StyledMarkdown } from "../components/core";

import { VSpace, VSpaceBetween } from "../components/layout";
import { PageHeading } from "../components/page";
import { Page } from "../components/site";
import { TalkByline, TalkYouTubeEmbed } from "../components/talk";
import { findTalks, TalkOverviewData } from "../data/talk";
import { invariant } from "../utils/invariant";

type TalkList = ReadonlyArray<TalkOverviewData>;

interface LivePageProps {
  talks: TalkList;
}

const LivePage: NextPage<LivePageProps> = ({ talks }) => {
  const happeningNow = useLiveTalks(talks);
  return (
    <Page title="Live Overview">
      <PageHeading>Live Overview</PageHeading>
      <VSpace />
      {happeningNow.length ? (
        <TalkTabs talks={happeningNow} />
      ) : (
        <p>No talks are happening right now.</p>
      )}
    </Page>
  );
};

export default LivePage;

export const getServerSideProps: GetServerSideProps<LivePageProps> =
  async () => {
    return {
      props: {
        talks: findTalks({}),
      },
    };
  };

const TalkTabs = ({ talks }: { talks: TalkList }) => {
  invariant(talks.length > 0, `TalkTabs requires talks array to be non-empty`);
  const fallbackRoomId = talks[0].room.id;
  const [roomId, setRoomId] = React.useState<string>(fallbackRoomId);

  const tabIndex = getIndexFromRoomId(talks, roomId);

  // If the room goes idle, tabIndex becomes null (since the roomId doesn't
  // correspond to a tab that actually exists). In that case, we just want to
  // set the active room to the first room in the list.
  React.useEffect(() => {
    if (tabIndex === null) {
      setRoomId(fallbackRoomId);
    }
  }, [fallbackRoomId, tabIndex]);

  const onTabChange = React.useCallback(
    (index) => {
      setRoomId(getRoomIdFromIndex(talks, index) || fallbackRoomId);
    },
    [fallbackRoomId, talks]
  );

  return (
    <Tabs
      orientation={TabsOrientation.Vertical}
      onChange={onTabChange}
      className={css`
        &[data-reach-tabs] {
          display: grid;
          grid-template-columns: 16rem 1fr;
        }
      `}
    >
      <TabList
        className={css`
          background: transparent;
        `}
      >
        {talks.map((t) => (
          <TalkTab key={t.id} talk={t} />
        ))}
      </TabList>
      <TabPanels>
        {talks.map((t) => (
          <TalkPanel key={t.id} talk={t} active={t.room.id === roomId} />
        ))}
      </TabPanels>
    </Tabs>
  );
};

function getIndexFromRoomId(
  talks: TalkList,
  roomId: string | null
): number | null {
  const index = talks.findIndex((t) => t.room.id === roomId);
  if (index === -1) return null;
  return index;
}

function getRoomIdFromIndex(talks: TalkList, index: number): string | null {
  if (!talks.length) return null;
  const talk = talks[index] || talks[0];
  return talk.room.id;
}

const TalkTab = ({ talk }: { talk: TalkOverviewData }) => {
  return (
    <Tab
      className={css`
        &[data-reach-tab] {
          border: none;
          display: block;
          padding: 1em;
          position: relative;
          background-color: transparent;
          transition: background-color 0.3s;
          min-height: 5rem;
          text-decoration: underline;

          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }

          &[data-selected] {
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
      {talk.title}
    </Tab>
  );
};

const TalkPanel = ({
  talk,
  active,
}: {
  talk: TalkOverviewData;
  active: boolean;
}) => {
  return (
    <TabPanel
      className={css`
        padding: 0 1rem;
      `}
    >
      <VSpaceBetween space={"2rem"}>
        <h2
          className={css`
            font-size: 1.75rem;
            font-family: "Patua One", sans-serif;
          `}
        >
          {talk.title}
        </h2>
        <div>
          <TalkYouTubeEmbed talk={talk} autoplay />
        </div>
        <TalkByline talk={talk} />
        {talk.abstract && <StyledMarkdown source={talk.abstract} />}
        {/*<pre*/}
        {/*  className={css`*/}
        {/*    white-space: pre-wrap;*/}
        {/*  `}*/}
        {/*>*/}
        {/*  <code>{JSON.stringify(talk, null, 1)}</code>*/}
        {/*</pre>*/}
      </VSpaceBetween>
    </TabPanel>
  );
};

// We used reversed version here to make comparison with -1 easier below
const roomOrderReversed = ["Blue", "Red", "Green", "Purple"].reverse();

function compareRoom(a: string, b: string): number {
  const aIndex = roomOrderReversed.indexOf(a);
  const bIndex = roomOrderReversed.indexOf(b);

  // If neither is in the roomOrder, sort them lexically
  if (aIndex === -1 && bIndex === -1) {
    return a > b ? 1 : -1;
  }

  // Otherwise, at least one is in the room order.
  // This is reversed from the usual way we'd do this comparison since it makes
  // handling -1 easier; in this case, -1 should appear *after* non-negative
  // integers.
  return aIndex > bIndex ? -1 : 1;
}

/**
 * Return the set of talks that are happening right this very second.
 */
function useLiveTalks(talks: TalkList): TalkList {
  const now = useNow();
  const happeningNow = talks.filter((talk) => {
    return (
      isBefore(parseISO(talk.startTime), now) &&
      isAfter(parseISO(talk.endTime), now)
    );
  });
  happeningNow.sort((a, b) => compareRoom(a.room.name, b.room.name));
  return happeningNow;
}

function useNow(): Date {
  return parseISO("2021-07-28T13:25:11.834Z");
  // const [now, setNow] = React.useState(() => new Date());
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setNow(new Date());
  //   }, 5 * 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // return now;
}
