import Link from "next/link";
import React from "react";
import { css } from "emotion";

export const Nav = () => {
  return (
    <nav
      className={css`
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      `}
    >
      <NavLink href={"/agenda"}>Agenda</NavLink>
    </nav>
  );
};

interface NavLinkProps {
  children: string;
  href: string;
  as?: string;
}
const NavLink = ({ children, href, as }: NavLinkProps) => {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  // NextJS does fancy™ stuff with links and it sets the href of the child <a />
  // element itself.
  return (
    <Link href={href} as={as}>
      <a
        className={css`
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
        `}
      >
        <span
          className={css`
            display: block;
            padding: 0.5rem;
          `}
        >
          {children}
        </span>
      </a>
    </Link>
  );
  /* eslint-enable */
};
