import React from "react";
import { usePosterListItemQuery } from "./PosterListItem.generated";
import { VSpace } from "../layout";
import { SpeakerListInline } from "../speaker";
import { StyledMarkdown } from "../core";
import { TextHeading } from "../content";
export const PosterListItem = ({ posterId }: { posterId: string }) => {
  const { data, error, loading } = usePosterListItemQuery({
    variables: { id: posterId },
  });

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  if (!data?.poster) return <p>Couldn't load this poster...</p>;

  const { title, abstract, speakers } = data.poster;
  const pdflink = String(data.poster.pdflink);

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
