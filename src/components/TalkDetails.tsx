import React from "react";
import { isPast, parseISO } from "date-fns";
import { css } from "emotion";
import { ExperiencesData, TalkOverviewData } from "../data/talk";
import { ExternalLink } from "./content";

import { StyledMarkdown } from "./core";
import { Center, VSpace } from "./layout";
import { PageHeading } from "./page";
import { TalkByline, TalkYouTubeEmbed } from "./talk";
import { MinisymposiumDetails } from "./talk/MinisymposiumDetails";

export const TalkDetails = ({ talk }: { talk: TalkOverviewData }) => {
  const startTime = parseISO(talk.startTime);
  const video = (() => {
    if (talk.experiences) {
      return <Experiences experiences={talk.experiences} />;
    }
    if (talk.videoCode && isPast(startTime)) {
      return (
        <>
          <VSpace />
          <Center>
            <TalkYouTubeEmbed talk={talk} />
          </Center>
        </>
      );
    }
    return null;
  })();

  return (
    <div>
      <PageHeading>{talk.title}</PageHeading>
      <VSpace />
      <TalkByline vertical talk={talk} />
      {video}
      <VSpace />
      {talk.minisymposium ? (
        <>
          <MinisymposiumDetails data={talk.minisymposium} />
          <VSpace />
        </>
      ) : null}
      {talk.abstract && (
        <div>
          <h4
            className={css`
              font-weight: bold;
              font-size: 1rem;
            `}
          >
            Abstract:
          </h4>
          <div
            className={css`
              padding-left: 1rem;
            `}
          >
            <StyledMarkdown source={talk.abstract} />
          </div>
        </div>
      )}
      <VSpace />
      {talk.description && (
        <div>
          <h4
            className={css`
              font-weight: bold;
              font-size: 1rem;
            `}
          >
            Description:
          </h4>
          <div
            className={css`
              padding-left: 1rem;
            `}
          >
            <StyledMarkdown source={talk.description} />
          </div>
        </div>
      )}
      <VSpace />
    </div>
  );
};

const Experiences = ({ experiences }: { experiences: ExperiencesData }) => {
  return (
    <div
      className={css`
        border-left: 0.5rem solid var(--julia-purple);
        padding: 1rem 1rem 1rem 2rem;
        margin: 1rem 0;
      `}
    >
      <p>
        This session consists of many individual "experience" talks (short two
        or three minute videos about experiences and applications with Julia).
      </p>
      <ul
        className={css`
          list-style: disc inside;
          padding-left: 1rem;

          li {
            margin: 0.25rem 0;
          }
        `}
      >
        {Object.entries(experiences.talks).map(([i, t]) => (
          <li key={i}>
            <ExternalLink href={`https://youtu.be/${t.videoCode}`}>
              {t.title}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
