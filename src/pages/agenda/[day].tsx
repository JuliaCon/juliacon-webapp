import React, { useContext } from "react";
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
import {
  ConferenceDay,
  isConferenceDay,
  timezoneOptions,
  TimezoneContext,
} from "../../const";
import { useRouter } from "next/router";
import Error from "next/error";
import Select from "react-select";

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

  const timezoneContext = useContext(TimezoneContext);
  const timezoneOption = {
    value: timezoneContext.timezone,
    label: "UTC" + timezoneContext.timezone,
  };

  if (typeof day !== "string" || !isConferenceDay(day)) {
    return <Error statusCode={404} />;
  }

  function onChange(option: any) {
    timezoneContext.changeTimezone(option.value);
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
      <Select
        options={timezoneOptions}
        onChange={onChange}
        value={timezoneOption}
        placeholder="Choose a timezone"
      />
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
