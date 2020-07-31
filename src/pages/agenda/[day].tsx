import React from "react";
import { NextPage } from "next";
import { withApollo } from "../../apollo";
import { AgendaTalksList } from "../../components/agenda";
import { ConferenceDayPicker } from "../../components/date";
import { Page } from "../../components/site";
import { Center, VSpace } from "../../components/layout";
import { useApolloClient } from "@apollo/client";
import {
  AgendaTalksListDocument,
  AgendaTalksListQuery,
  AgendaTalksListQueryVariables,
} from "../../components/agenda/AgendaTalksList.generated";
import { ConferenceDay, isConferenceDay } from "../../const";
import { useRouter } from "next/router";
import Error from "next/error";

const Agenda: NextPage = () => {
  const router = useRouter();
  const { day } = router.query;
  const apollo = useApolloClient();

  const onNavIntent = React.useCallback(
    (day: ConferenceDay) => {
      apollo.query<AgendaTalksListQuery, AgendaTalksListQueryVariables>({
        query: AgendaTalksListDocument,
        variables: {
          conferenceDay: day,
        },
      });
    },
    [apollo]
  );

  if (typeof day !== "string" || !isConferenceDay(day)) {
    return <Error statusCode={404} />;
  }

  return (
    <Page>
      <Center>
        <ConferenceDayPicker
          day={day}
          linkHrefFn={linkHrefFn}
          onNavIntent={onNavIntent}
        />
      </Center>
      <VSpace />
      <AgendaTalksList conferenceDay={day} />
    </Page>
  );
};

function linkHrefFn(day: ConferenceDay) {
  return {
    href: "/agenda/[day]",
    as: `/agenda/${day}`,
  };
}

export default withApollo()(Agenda);
