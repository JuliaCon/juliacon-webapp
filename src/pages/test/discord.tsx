import { NextPage } from "next";
import React from "react";

import { withApollo } from "../../apollo";
import { Page } from "../../components/layout";
import { DiscordEmbed } from "../../components/discord";
import { css } from "emotion";

const DiscordPage: NextPage = () => {
  return (
    <Page>
      <DiscordEmbed
        className={css`
          width: 100%;
          height: 600px;
        `}
      />
    </Page>
  );
};

export default withApollo()(DiscordPage);
