import React from "react";

import { PosterData } from "../../data/poster";
import { TextHeading } from "../content";
import { StyledMarkdown } from "../core";
import { VSpace } from "../layout";
import { SpeakerListInline } from "../speaker";

export const PosterListItem = ({ poster }: { poster: PosterData }) => {
  const { title, abstract, speakers, pdflink } = poster;
  return (
    <div>
      <TextHeading level={"h3"}>
        <a href={pdflink} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </TextHeading>
      <VSpace height={"0.5rem"} />
      <SpeakerListInline speakers={speakers} />
      <StyledMarkdown source={abstract} />
    </div>
  );
};
