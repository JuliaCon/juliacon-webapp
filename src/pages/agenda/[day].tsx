import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { AgendaTalksList } from "../../components/agenda";
import { ConferenceDayPicker } from "../../components/date";
import { Center, VSpace } from "../../components/layout";
import { PageHeading } from "../../components/page";
import { Page } from "../../components/site";
import { CONFERENCE_DAYS, ConferenceDay } from "../../const";
import { getTalksForDay, TalkOverviewData } from "../../data/talk";

interface AgendaProps {
  day: ConferenceDay;
  talks: ReadonlyArray<TalkOverviewData>;
}

const Agenda: NextPage<AgendaProps> = ({ day, talks }) => {
  return (
    <Page title={"Agenda"}>
      <PageHeading>Conference Agenda</PageHeading>
      <VSpace />
      <Center>
        <ConferenceDayPicker day={day} linkHrefFn={linkHrefFn} />
      </Center>
      <VSpace />
      <AgendaTalksList talks={talks} />
    </Page>
  );
};

export default Agenda;

function linkHrefFn(day: ConferenceDay) {
  return {
    href: "/agenda/[day]",
    as: `/agenda/${day}`,
  };
}

export const getStaticProps: GetStaticProps<AgendaProps> = async (ctx) => {
  const day = ctx.params?.["day"] as ConferenceDay;

  const props: AgendaProps = {
    day,
    talks: getTalksForDay(day),
  };

  return { props };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: CONFERENCE_DAYS.map((day) => ({
      params: { day },
    })),
    fallback: false,
  };
};
