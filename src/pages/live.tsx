import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsOrientation,
} from "@reach/tabs";
import {
  addHours,
  addMinutes,
  addSeconds,
  isAfter,
  isBefore,
  parseISO,
} from "date-fns";
import { css } from "emotion";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Link, StyledMarkdown } from "../components/core";

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
  const page = (
    <Page title="Live Overview">
      <PageHeading>Live Overview</PageHeading>
      <VSpace />
      {__DEV__ ? <NowManipulator /> : null}
      <VSpace />
      <Inner talks={talks} />
    </Page>
  );

  if (__DEV__) {
    return (
      <NowOverrideProvider initialValue="2021-07-28T13:25:11.834Z">
        {page}
      </NowOverrideProvider>
    );
  }

  return page;
};

const Inner = ({ talks }: { talks: TalkList }) => {
  const happeningNow = useLiveTalks(talks);
  if (happeningNow.length) {
    return <TalkTabs talks={happeningNow} />;
  } else {
    return <p>No talks are happening right now.</p>;
  }
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
          // NOTE: We make the key the room id here to prevent the YouTube video
          // from dismounting between subsequent live talks (i.e., to avoid
          // disrupting the livestreams). This is required since otherwise,
          // between two live talks (e.g., successive keynotes), React will see
          // that the key changed and re-create the whole DOM tree from this
          // node (which will re-trigger the YouTube video to autoplay).
          <TalkTab key={t.room.id} talk={t} />
        ))}
      </TabList>
      <TabPanels>
        {talks.map((t) => (
          <TalkPanel key={t.room.id} talk={t} active={t.room.id === roomId} />
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
        <div>{active && <TalkYouTubeEmbed talk={talk} autoplay />}</div>
        <TalkByline talk={talk} />
        {talk.abstract && (
          <>
            <h3
              className={css`
                font-size: 1.25rem;
                font-family: "Patua One", sans-serif;
                margin-bottom: 1rem;
              `}
            >
              Abstract
            </h3>
            <StyledMarkdown source={talk.abstract} />
          </>
        )}
        {talk.nextTalk && (
          <div
            className={css`
              width: 20rem;
              margin-left: auto;
              border-left: 0.5rem solid ${talk.room.color || "#cccccc"};
              padding: 0.5rem;
            `}
          >
            <p>Up Next:</p>
            <VSpace height={"0.5rem"} />
            <p
              className={css`
                padding-left: 1rem;
              `}
            >
              <Link href={"/talk/[id]"} as={`/talk/${talk.nextTalk.id}`}>
                {talk.nextTalk.title}
              </Link>
            </p>
          </div>
        )}
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
  const happeningNow = React.useMemo(() => {
    const happeningNow = talks.filter((talk) => {
      if (talk.type === "Keynote" && !talk.nextTalk) {
        // For keynotes (which are live), we pad the end of the session to allow
        // for when they (inevitably) go over time.
        const endTime = addMinutes(parseISO(talk.endTime), 15);
        return isBefore(parseISO(talk.startTime), now) && isAfter(endTime, now);
      }
      return (
        isBefore(parseISO(talk.startTime), now) &&
        isAfter(parseISO(talk.endTime), now)
      );
    });

    happeningNow.sort((a, b) => compareRoom(a.room.name, b.room.name));
    return happeningNow;
  }, [now, talks]);
  return happeningNow;
}

interface NowContext {
  now: Date;
  setNow(d: Date | ((d: Date) => Date)): void;
  advancing: boolean;
  setAdvancing(advancing: boolean): void;
}
const NowOverrideContext = React.createContext<NowContext | null>(null);

const NowOverrideProvider = ({
  children,
  initialValue,
}: {
  children: React.ReactNode;
  initialValue?: string;
}) => {
  const [now, setNow] = React.useState(() =>
    initialValue ? parseISO(initialValue) : new Date()
  );
  const [advancing, setAdvancing] = React.useState(true);

  React.useEffect(() => {
    if (!advancing) return;

    // Note: This interval won't actually be exactly every second (due to
    // various latencies) so it will advance slightly slower than 1 second.
    // That's fine since this is only really for testing purposes.
    const interval = setInterval(() => {
      setNow((now) => addSeconds(now, 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [advancing]);

  const ctx: NowContext = {
    now,
    setNow,
    advancing,
    setAdvancing,
  };
  return (
    <NowOverrideContext.Provider value={ctx}>
      {children}
    </NowOverrideContext.Provider>
  );
};

const NowManipulator = () => {
  const ctx = React.useContext(NowOverrideContext);
  if (!ctx) return null;

  let nowstr = ctx.now.toISOString();
  nowstr = nowstr.substr(0, nowstr.length - 1);

  return (
    <div
      className={css`
        button {
          padding: 0.5rem;
          margin: 0.25rem 0.5rem;
          border-radius: 1rem;
        }
      `}
    >
      <div>
        <input
          type="datetime-local"
          value={nowstr}
          onChange={(e) => {
            const val = e.currentTarget.value;
            const newNow = parseISO(val + "Z");
            if (Number.isNaN(newNow.getTime())) {
              // skip update
              return;
            }
            ctx.setNow(newNow);
          }}
        />
        <button onClick={() => ctx.setAdvancing(!ctx.advancing)}>
          {ctx.advancing ? "Pause" : "Play"}
        </button>
      </div>
      <div>
        <button onClick={() => ctx.setNow((d) => addHours(d, -1))}>- 1h</button>
        <button onClick={() => ctx.setNow((d) => addMinutes(d, -5))}>
          - 5m
        </button>
        <button onClick={() => ctx.setNow((d) => addMinutes(d, -1))}>
          - 1m
        </button>
        <button onClick={() => ctx.setNow((d) => addMinutes(d, 1))}>
          + 1m
        </button>
        <button onClick={() => ctx.setNow((d) => addMinutes(d, 5))}>
          + 5m
        </button>
        <button onClick={() => ctx.setNow((d) => addHours(d, 1))}>+ 1h</button>
      </div>
    </div>
  );
};

function useNow(): Date {
  const override = React.useContext(NowOverrideContext);
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    if (override) return;
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [override]);

  if (override) return override.now;
  return now;
}
