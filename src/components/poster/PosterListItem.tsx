import React from "react";
import { usePosterListItemQuery } from "./PosterListItem.generated";
import { css } from "emotion";
import { Link } from "../core";
import { AgendaTalksListItemSpeakers } from "../agenda/AgendaTalksListItem";
import { VSpace } from "../layout";
export const PosterListItem = ({ posterId }: { posterId: string }) => {
  const { data, error, loading } = usePosterListItemQuery({
    variables: { id: posterId },
  });

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  if (!data?.poster) return <p>Couldn't load this poster...</p>;

  const { title, abstract, pdflink, speakers } = data.poster;

  return (
    <div>
      <Link href={pdflink} as={pdflink}>
        <h4
          className={css`
            font-weight: bold;
          `}
        >
          {title}
        </h4>
      </Link>
      <AgendaTalksListItemSpeakers speakers={speakers} />
      <VSpace />
      <p>{abstract}</p>
      <VSpace />
    </div>
  );
};
