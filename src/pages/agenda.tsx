import React from "react";
import { NextPage } from "next";

import { withApollo } from "../apollo";
import { AgendaTalksList } from "../components/agenda";
import {
  ConferenceDayPicker,
  useConferenceDayPickerState,
} from "../components/date";
import { Page } from "../components/site";
import { Center } from "../components/layout";
import { useApolloClient } from "@apollo/client";
import {
  AgendaTalksListDocument,
  AgendaTalksListQuery,
  AgendaTalksListQueryVariables,
} from "../components/agenda/AgendaTalksList.generated";
import { ConferenceDay } from "../const";

const Agenda: NextPage = () => {
  const dayPickerState = useConferenceDayPickerState();

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

  return (
    <Page>
      <Center>
        <ConferenceDayPicker state={dayPickerState} onNavIntent={onNavIntent} />
      </Center>
      <AgendaTalksList conferenceDay={dayPickerState.value} />
    </Page>
  );
};

export default withApollo()(Agenda);
