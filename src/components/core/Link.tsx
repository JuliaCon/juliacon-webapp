import NextLink from "next/link";
import React from "react";

interface LinkProps {
  children: string;
  href: string;
  as?: string;
}
export const Link = ({ children, href, as }: LinkProps) => {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  // NextJS does fancy™ stuff with links and it sets the href of the child <a />
  // element itself.
  return (
    <NextLink href={href} as={as}>
      <a>{children}</a>
    </NextLink>
  );
  /* eslint-enable */
};
