import * as React from "react";
import { VSpace } from "../layout";
import { css } from "emotion";

export function useInputRef() {
  return React.useRef<HTMLInputElement | null>(null);
}

interface FormInputProps {
  description?: React.ReactChild;
  disabled?: boolean;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  label: string;
  name?: string;
  type: "text" | "file";
  errorMessage?: string;
}
export const FormInput = ({
  description,
  disabled,
  errorMessage,
  inputRef,
  label,
  name,
  type,
}: FormInputProps) => {
  const descriptionElt = description && (
    <>
      <VSpace height={"0.5rem"} />
      <p
        className={css`
          font-size: 0.9em;
          padding-left: 1rem;
          color: #333;
        `}
      >
        {description}
      </p>
    </>
  );
  const errorMessageElt = errorMessage && (
    <>
      <VSpace height={"0.5rem"} />
      <div
        className={css`
          font-size: 0.9em;
          padding-left: 1rem;
          color: hsl(0, 100%, 20%);
        `}
      >
        <p
          className={css`
            border-left: 4px solid hsl(0, 100%, 40%);
            padding-left: 0.5rem;
          `}
        >
          {errorMessage}
        </p>
      </div>
    </>
  );
  return (
    <label
      className={css`
        display: block;
        padding: 0.5rem;
      `}
    >
      <p>{label}</p>
      {descriptionElt}
      {errorMessageElt}
      <VSpace height={"0.5rem"} />
      <input
        ref={inputRef}
        type={type}
        disabled={disabled}
        name={name}
        className={css`
          display: block;
          width: 100%;
          padding: 0.25rem;
          font-size: 1rem;
        `}
      />
    </label>
  );
};
