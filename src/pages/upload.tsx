import { NextPage } from "next";
import React from "react";

import { S3Uploader } from "../components/upload/S3Uploader";
import { css } from "emotion";

import Logo from "../assets/logo.svg";
import { Center, VSpace } from "../components/layout";

const UploadPage: NextPage = () => {
  return (
    <div
      className={css`
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        className={css`
          width: 100%;
          max-width: 500px;
          border: 1px solid #ccc;
          border-radius: 2px;
          padding: 0.5rem;

          @media screen and (max-width: 450px) {
            border: none;
            max-width: 100%;
          }
        `}
      >
        <Center>
          <Logo
            className={css`
              height: auto;
              max-height: 4rem;
            `}
          />
        </Center>
        <VSpace />
        <S3Uploader />
      </div>
    </div>
  );
};

export default UploadPage;
