import * as React from "react";
import { NextPage } from "next";

import { Page } from "../components/site";
import { PosterList } from "../components/poster";
import { withApollo } from "../apollo";
import { PageHeading } from "../components/page";
import { VSpace } from "../components/layout";
import Link from "next/link";

/**
 * An overview of all of the poster submissions for the conference.
 *
 * See https://github.com/JuliaCon/juliacon-webapp/issues/2 for details.
 */
const PostersPage: NextPage = () => {
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
      <PosterList />
    </Page>
  );
};

export default withApollo()(PostersPage);
