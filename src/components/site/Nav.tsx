/* eslint-disable jsx-a11y/anchor-is-valid */
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
      <NavLink href={"/speakers"}>Speakers</NavLink>
      <NavLink href={"/sponsors"}>Sponsors</NavLink>
    </nav>
  );
};

interface NavLinkProps {
  children: string;
  href: string;
}
const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <Link href={href}>
      <div
        className={css`
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          transition: background-color 0.3s;
          position: relative;

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
        <a
          className={css`
            text-decoration: none;
            padding: 0.5rem;
          `}
        >
          {children}
        </a>
      </div>
    </Link>
  );
};
