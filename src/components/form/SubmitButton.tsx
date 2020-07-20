import { Center } from "../layout";
import { css } from "emotion";
import * as React from "react";

interface SubmitButtonProps {
  pending: boolean;
}
export const SubmitButton = ({ pending }: SubmitButtonProps) => {
  return (
    <Center>
      <input
        type={"submit"}
        disabled={pending}
        className={css`
          font-size: 1rem;
        `}
      />
    </Center>
  );
};
