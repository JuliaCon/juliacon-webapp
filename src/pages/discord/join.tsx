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
  EventbriteError,
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
      <VSpace />
      <p>
        If you’re comfortable using the designated hallway channels to direct
        questions to presenters, please do so. This way everyone can benefit
        from the answer you get! Attendees are encouraged to request new
        channels to create gathering places for those with specific interests
        (e.g., #web for attendees interested in applications of Julia to the
        web). Let us know in #channel-requests if you’d like a new text or voice
        channel. To report issues, please contact an admin (red) or organizer
        (blue) on Discord. Organizers are identifiable in the user list on
        Discord.
      </p>
      <VSpace />
      <p>
        Note that if you asked for you ticket to be refunded, you will need to{" "}
        <a href={"https://juliacon.org/2020/tickets/"}>
          re-register for the conference
        </a>{" "}
        (at no cost).
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
  const errorMessage = (() => {
    switch (status) {
      case DiscordJoinStatus.InvalidEventbriteCode:
        return "The Eventbrite confirmation code that you entered is not valid.";
      case DiscordJoinStatus.EventbriteError:
        return (
          "Something went wrong while trying to confirm your registration. " +
          "Please make sure that you are using the correct confirmation code. " +
          "If you continue to have issues, please reach out to the JuliaCon organizers."
        );
    }
  })();

  return (
    <form action={"/api/discord/join"} method={"post"}>
      <FormInput
        label={"eventbrite confirmation"}
        description={
          <>
            We need your Eventbrite confirmation code to make sure that you are
            registered for the conference.
            <br />
            You can find the code in the email confirmation from Eventbrite,
            usually in the form "Order #1234567890" under "Order Summary."
          </>
        }
        type={"text"}
        name={"eventbriteCode"}
        errorMessage={errorMessage}
      />
      <VSpace />
      <DiscordRules />
      <VSpace />
      <p>
        By joining the JuliaCon 2020 Discord server, you are acknowledging the
        rules above and are agreeing to follow them.
      </p>
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
      <DiscordRules />
    </>
  );
};

const DiscordRules = () => {
  return (
    <>
      <p>
        As a reminder, discussion in the JuliaCon 2020 Discord server must
        adhere to the{" "}
        <a
          href={"https://juliacon.org/2020/coc"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          JuliaCon Code of Conduct
        </a>{" "}
        as well as the{" "}
        <a
          href={"https://julialang.org/community/standards/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          JuliaCon Code of Conduct
        </a>{" "}
        . Please also observe these expectations for the server:
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
          Discussion in the conference track channels (#red, #green, and
          #purple) should pertain to the talk currently airing in the
          corresponding track.
        </li>
        <li>
          When engaged in voice channels, participants should be muted when not
          speaking or should use the push-to-talk feature.
        </li>
        <li>
          All Direct Messages (DMs) must be of a professional and respectful
          nature. If you wish to disable DMs from other attendees, you can do so
          as{" "}
          <a
            href={
              "https://support.discord.com/hc/en-us/articles/217916488-Blocking-Privacy-Settings-"
            }
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            described in the Discord documentation
          </a>
          .
        </li>
        <li>
          For speakers, please do not exceed your allocated question-and-answer
          time (i.e. do not continue to use the channel for Q&A after the
          following talk has begun). Feel free to move to direct messaging if
          you wish to ask a question after the end of a talk.
        </li>
      </ul>
    </>
  );
};
