import * as React from "react";
import { NextPage } from "next";
import { Page } from "../../components/site";
import { css } from "emotion";
import { Center, VSpace } from "../../components/layout";
import { FormInput, SubmitButton } from "../../components/form";
import { useRouter } from "next/router";

export enum DiscordJoinStatus {
  Success,
  InvalidEventbriteCode,
}

const DiscordJoinPage: NextPage = () => {
  const router = useRouter();
  const status = (() => {
    const { status } = router.query;
    if (typeof status === "string") {
      return Number(status) as DiscordJoinStatus;
    }
    return undefined;
  })();

  const inner = (() => {
    switch (status) {
      case DiscordJoinStatus.Success:
        return <DiscordJoinSuccess />;
      case DiscordJoinStatus.InvalidEventbriteCode:
      case undefined:
      default:
        return <DiscordJoinForm status={status} />;
    }
  })();
  return (
    <Page>
      <h1
        className={css`
          font-size: 1.5rem;
        `}
      >
        Join Discord!
      </h1>
      <VSpace />
      <p>
        Discord is where all the discussion around JuliaCon will take place.
        You'll need to make a Discord account if you don't have one (the process
        below will prompt you to login to or register for Discord).
      </p>
      <VSpace height={"2rem"} />
      <div
        className={css`
          max-width: 24rem;
          margin: 0 auto;
        `}
      >
        {inner}
      </div>
    </Page>
  );
};

export default DiscordJoinPage;

interface DiscordJoinFormProps {
  status?: DiscordJoinStatus;
}
const DiscordJoinForm = ({ status }: DiscordJoinFormProps) => {
  const errorMessage =
    status === DiscordJoinStatus.InvalidEventbriteCode
      ? "The Eventbrite confirmation code that you entered is not valid."
      : undefined;
  return (
    <form action={"/api/discord/join"} method={"post"}>
      <FormInput
        label={"eventbrite confirmation"}
        description={
          "We need your Eventbrite confirmation code to make sure that you are registered for the conference."
        }
        type={"text"}
        name={"eventbriteCode"}
        errorMessage={errorMessage}
      />
      <VSpace />
      <SubmitButton pending={false} />
    </form>
  );
};

const DiscordJoinSuccess = () => {
  return (
    <>
      <Center>
        <h2
          className={css`
            font-size: 1.25rem;
          `}
        >
          Success!
        </h2>
      </Center>
      <VSpace />
      <p>
        You have been sucessfully added to the JuliaCon 2020 Discord server.
        Please download the{" "}
        <a href="https://discord.com/new">Discord native client</a> or use the{" "}
        <a href="https://discord.com/app">Discord web app</a> (in browser) to
        engage with the conference community.
      </p>
      <VSpace />
      <p>
        As a reminder, discussion in the JuliaCon Discord server must adhere to
        the{" "}
        <a href="https://julialang.org/community/standards/">
          Julia community standards
        </a>
        . Additionally, please limit conversation to the appropriate channels at
        the appropriate talks.
      </p>
      <ul
        className={css`
          padding-left: 2rem;
          list-style: disc outside;

          li {
            padding-top: 0.5rem;
          }
        `}
      >
        <li>
          Discussion in the conference track channels (#red, #green, and #blue)
          should pertain to the currently airing talk.
        </li>
        <li>
          Attendees are encouraged to use the designated hallway channels rather
          than DMs for general chat to promote an air of openness and to ensure
          the comfort and safety of all attendees.
        </li>
        <li>
          For speakers, please do not exceed your allocated question-and-answer
          time (i.e. do not continue to use the channel for Q&A after the
          subsequent talk has begin). Feel free to move to direct messaging if
          you wish to ask a question after the end of a talk.
        </li>
        <li>
          When engaged in voice channels, participants should be muted when not
          speaking or should use the push-to-talk feature.
        </li>
      </ul>
    </>
  );
};
