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

const Agenda: NextPage = () => {
  const dayPickerState = useConferenceDayPickerState();
  return (
    <Page>
      <Center>
        <ConferenceDayPicker state={dayPickerState} />
      </Center>
      <AgendaTalksList conferenceDay={dayPickerState.value} />
    </Page>
  );
};

export default withApollo()(Agenda);
