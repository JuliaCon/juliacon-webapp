import { css } from "emotion";

export function mobileOnly(style: string) {
  return css`
    @media screen and (max-width: 600px) {
      ${style};
    }
  `;
}

export function desktopOnly(style: string) {
  return css`
    @media screen and (min-width: 601px) {
      ${style};
    }
  `;
}
