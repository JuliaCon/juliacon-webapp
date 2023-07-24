import Link from "next/link";
import React from "react";
import { css, cx } from "emotion";
import { mobileOnly } from "../../utils/css";

export const Nav = () => {
  return (
    <nav
      className={cx(
        css`
          height: 100%;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
        `,
        mobileOnly(
          css`
            flex-flow: row wrap;
            justify-content: center;
          `
        )
      )}
    >
      <NavLink href={"/"}>
        <span aria-hidden="true">🎉</span> Live Talks!{" "}
        <span aria-hidden={"true"}>🎉</span>
      </NavLink>
      <NavLink href={"https://juliacon.org/2022/tickets/"} external>
        Register
      </NavLink>
      <NavLink href={"/about"}>About</NavLink>
      <NavLink href={"/agenda"}>Schedule</NavLink>
      {/*<NavLink href={"/posters"}>Posters</NavLink>*/}
      <NavLink href={"/sponsors"}>Sponsors</NavLink>
      {/*<NavLink href={"/jobs"}>Jobs Board</NavLink>*/}
      <div
        className={cx(
          css`
            height: 100%;
          `,
          mobileOnly(
            css`
              display: none;
            `
          )
        )}
      >
        <NavLink href={"/viz"}>Explore Talks</NavLink>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  as?: string;
  external?: boolean;
}
const NavLink = ({ children, href, as, external }: NavLinkProps) => {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  // NextJS does fancy™ stuff with links and it sets the href of the child <a />
  // element itself.

  const anchorElement = (
    <a
      // We can't just set href=undefined here, since that will prevent NextJS
      // from setting the URL itself (it seems to differentiate "unset" from
      // "set but undefined"). Instead we either spread an object with the href
      // if we want to set it, or any empty object if we dont.
      {...(external
        ? { href, target: "_blank", rel: "noopener nofollower" }
        : {})}
      className={cx(
        css`
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          transition: background-color 0.3s;
          position: relative;
          text-decoration: none;

          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }

          &::after {
            position: absolute;
            bottom: -1px;
            width: 100%;
            height: 4px;
            background-color: var(--julia-purple);
            content: " ";
            opacity: 0;
            transition: opacity 0.3s;
          }

          &:hover::after {
            opacity: 1;
          }
        `,
        mobileOnly(
          css`
            text-decoration: underline;
          `
        )
      )}
    >
      <span
        className={css`
          display: block;
          padding: 1rem;
        `}
      >
        {children}
      </span>
    </a>
  );

  if (external) return anchorElement;

  return (
    <Link href={href} as={as}>
      {anchorElement}
    </Link>
  );
  /* eslint-enable */
};
