import React, { useState } from "react";
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
import Dropdown from "react-dropdown";

const options = [
  { value: 0, label: "UTC+0" },
  { value: 60, label: "UTC+1" },
  { value: 120, label: "UTC+2" },
  { value: 180, label: "UTC+3" },
];

const Agenda: NextPage = () => {
  const router = useRouter();
  const { day } = router.query;
  const [zoneOffset, setZoneOffset] = useState(0);
  const apollo = useApolloClient();
  const onNavIntent = React.useCallback(
    (day: ConferenceDay) => {
      apollo.query<AgendaTalksListQuery, AgendaTalksListQueryVariables>({
        query: AgendaTalksListDocument,
        variables: {
          conferenceDay: day,
          zoneOffset: 0,
        },
      });
    },
    [apollo]
  );

  if (typeof day !== "string" || !isConferenceDay(day)) {
    return <Error statusCode={404} />;
  }

  const defaultOption = options[0];

  function onChange(option) {
    setZoneOffset(option.value);
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
      <Center>Choose your timezone</Center>
      <Dropdown
        options={options}
        onChange={onChange}
        value={defaultOption}
        placeholder="Choose a timezone"
      />
      <VSpace />
      <AgendaTalksList conferenceDay={day} zoneOffset={zoneOffset} />
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
