import * as React from "react";
import Amplify, { Storage } from "aws-amplify";
import { css } from "emotion";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useWindowCloseListener } from "../../hooks/useWindowCloseListener";
import { Center, VSpace } from "../layout";
import { FormInput, SubmitButton, useInputRef } from "../form";

// These are public credentials. They are intended to be exposed to the
// frontend. Importantly, the backend bucket is configured to act as a dropbox,
// so users cannot list or delete files, only upload new files.
const bucket = "juliacon2020-uploads";
const region = "us-east-2";
const identityPoolId = "us-east-2:7daded2f-5a31-4312-bc27-633e4a385fd6";

if (!__SERVER__) {
  Amplify.configure({
    Auth: {
      identityPoolId,
      region,
    },
    Storage: {
      AWSS3: {
        bucket,
        region,
      },
    },
  });
}

export const S3Uploader = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [uploadPromise, setUploadPromise] =
    React.useState<Promise<unknown> | null>(null);

  // We need to have a ref since we need to be able to check this inside of the
  // form submit callback (since the AWS amplify API is all async)
  const uploadPromiseRef = React.useRef<Promise<unknown> | null>(null);
  React.useEffect(() => {
    uploadPromiseRef.current = uploadPromise;
  }, [uploadPromise]);

  const [uploadState, setUploadState] = React.useState<
    null | "pending" | "done" | "error"
  >(null);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);

  // Update `uploadState` when the Promise changes state
  React.useEffect(() => {
    if (!uploadPromise) return;
    let cancelled = false;
    setUploadState("pending");
    uploadPromise.then(
      (result) => {
        if (cancelled) return;
        console.log("S3 upload completed:", result);
        setUploadState("done");
      },
      (error) => {
        if (cancelled) return;
        console.error("S3 upload failed:", error);
        setUploadState("error");
      }
    );

    return () => {
      cancelled = true;
    };
  }, [uploadPromise]);

  // Prevent the page from being closed when an upload is in progress
  useWindowCloseListener(
    React.useCallback((e) => {
      e.preventDefault();
      return false;
    }, []),
    { register: uploadState === "pending" }
  );

  const yourNameInputRef = useInputRef();
  const pretalxIdInputRef = useInputRef();
  const talkNameInputRef = useInputRef();
  const fileInputRef = useInputRef();

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      // Prevent the form from hard-refreshing the page
      e.preventDefault();

      const talkName = talkNameInputRef.current?.value;
      if (!talkName) {
        setErrorMessage("Please include the title of your talk.");
        return;
      }

      const files = fileInputRef.current?.files;
      if (!files || files.length === 0) {
        setErrorMessage("Please upload a file.");
        return;
      }

      const uploaderName = yourNameInputRef.current?.value;
      if (!uploaderName) {
        setErrorMessage("Please include your name.");
        return;
      }

      const pretalxId = pretalxIdInputRef.current?.value
        ? pretalxIdInputRef.current?.value
        : "UNKNWN";

      const file = files[0];
      const promise = Storage.put(
        `${pretalxId}:${talkName}:${file.name}`,
        file,
        {
          contentType: file.type,
          // NOTE: When using S3 and REST, we have to encode everything as ascii.
          // URI-encoding seems to me the simplest workaround for now.
          metadata: {
            talkName: encodeURIComponent(talkName),
            uploaderName: encodeURIComponent(uploaderName),
          },
          progressCallback: (event: ProgressEvent) => {
            if (uploadPromiseRef.current !== promise) return;
            setUploadProgress(event.loaded / event.total);
          },
        }
      );

      setUploadPromise(promise);
      setUploadProgress(0);
    },
    [fileInputRef, talkNameInputRef, yourNameInputRef, pretalxIdInputRef]
  );

  const disabled = uploadState === "pending";
  return (
    <div>
      <form onSubmit={onSubmit}>
        {errorMessage && (
          <>
            <ErrorMessage>
              <p>{errorMessage}</p>
            </ErrorMessage>
            <VSpace />
          </>
        )}
        <FormInput
          disabled={disabled}
          inputRef={yourNameInputRef}
          label={"Your Name"}
          type={"text"}
        />
        <VSpace />
        <FormInput
          disabled={disabled}
          inputRef={pretalxIdInputRef}
          label={"Pretalx Talk ID"}
          description={
            <>
              (Optional) The ID is the six character slug at the end of the url
              of your talk page. Navigate to it from{" "}
              <a
                href={"https://pretalx.com/juliacon-2022/me/submissions/"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                Pretalx
              </a>
              (must be signed in to view).
            </>
          }
          type={"text"}
        />
        <VSpace />
        <FormInput
          disabled={disabled}
          inputRef={talkNameInputRef}
          label={"Talk or Poster Title"}
          description={
            <>
              Please use the exact title that you used when submitting on{" "}
              <a
                href={"https://pretalx.com/juliacon-2022/me/submissions/"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                Pretalx
              </a>
              .
            </>
          }
          type={"text"}
        />
        <VSpace />
        <FormInput
          disabled={disabled}
          inputRef={fileInputRef}
          label={"Video/Poster/Presentation File"}
          type={"file"}
        />
        <VSpace />
        <SubmitButton pending={uploadState === "pending"} />
        {uploadState && (
          <>
            <VSpace />
            <UploadStatusIndicator
              uploadProgress={uploadProgress}
              uploadState={uploadState}
            />
          </>
        )}
      </form>
    </div>
  );
};

const ErrorMessage: React.FC = ({ children }) => {
  return (
    <div
      className={css`
        background-color: #f2dede;
        border: 1px solid #aa0000;
        padding: 1rem;
      `}
    >
      {children}
    </div>
  );
};

interface ProgressIndicatorProps {
  progress: number;
}
const ProgressIndicator = ({ progress }: ProgressIndicatorProps) => {
  if (progress < 0 || progress > 1) {
    throw new Error(`Invalid progress value (should be in [0, 1])`);
  }

  const percentage = Math.floor(progress * 100);

  return (
    <div
      className={css`
        width: 100%;
        position: relative;
      `}
    >
      <div
        className={css`
          height: 2rem;
          background-color: #90ee90;
        `}
        style={{ width: `${percentage}%` }}
      />
      <p
        className={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      >
        {percentage}%
      </p>
    </div>
  );
};

interface UploadStatusIndicatorProps {
  uploadState: "pending" | "done" | "error";
  uploadProgress: number;
}
const UploadStatusIndicator = ({
  uploadState,
  uploadProgress,
}: UploadStatusIndicatorProps) => {
  switch (uploadState) {
    case "pending":
      return (
        <div>
          <Center>
            <p>
              <FontAwesomeIcon icon={faCog} spin />
              <span>&nbsp; Uploading...</span>
            </p>
          </Center>
          <VSpace />
          <ProgressIndicator progress={uploadProgress} />
        </div>
      );
    case "done":
      return (
        <Center>
          <p>Your upload was successful. Thank you!</p>
        </Center>
      );
    case "error":
      return (
        <div>
          <ErrorMessage>
            <p>
              The upload didn't succeed! Check the browser console for more
              information. Please reach out to{" "}
              <a href={"mailto:juliacon@julialang.org"}>the JuliaCon team</a>{" "}
              for more assistance.
            </p>
          </ErrorMessage>
        </div>
      );
  }
};
