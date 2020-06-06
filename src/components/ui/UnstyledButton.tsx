import * as React from "react";
import { css, cx } from "emotion";

export const UnstyledButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cx(
        css`
          display: block;
          border: none;
          background: transparent;
          padding: 0;
          margin: 0;
          font-size: inherit;
          cursor: pointer;

          &:disabled {
            cursor: not-allowed;
          }
        `,
        props.className
      )}
    />
  );
});
