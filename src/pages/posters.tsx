import * as React from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { VSpace } from "../components/layout";
import { PageHeading } from "../components/page";
import { PosterList } from "../components/poster";
import { Page } from "../components/site";
import { getPosters, PosterData } from "../data/poster";

interface PostersPageProps {
  posters: ReadonlyArray<PosterData>;
}

/**
 * An overview of all of the poster submissions for the conference.
 *
 * See https://github.com/JuliaCon/juliacon-webapp/issues/2 for details.
 */
const PostersPage: NextPage<PostersPageProps> = ({ posters }) => {
  return (
    <Page title={"Posters"}>
      <PageHeading>Posters</PageHeading>
      <VSpace />
      <p>
        During the poster session, please direct questions to the presenters on{" "}
        <Link href={"/discord/join"}>Discord</Link>. Poster presenters will
        present and answer questions on the #purple channel. If the poster is
        not currently being presented, please direct questions and comments to
        the channels devoted to each specific poster.
      </p>
      <VSpace />
      <PosterList posters={posters} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps<PostersPageProps> = async () => {
  return { props: { posters: getPosters() } };
};

export default PostersPage;
