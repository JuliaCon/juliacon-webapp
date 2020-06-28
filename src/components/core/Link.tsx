import NextLink from "next/link";
import React from "react";

export interface LinkProps {
  children: React.ReactNode;
  href: string | undefined;
  as?: string;
  className?: string;
}
export const Link = ({ children, href, as, className }: LinkProps) => {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  // NextJS does fancy™ stuff with links and it sets the href of the child <a />
  // element itself.
  const inner = <a className={className}>{children}</a>;
  /* eslint-enable */

  // It's semantically valid to have an anchor tag with no href (this is
  // equivalent to a "disabled" link), but NextJS does not like it (it will
  // raise a type error and throw a runtime error as well).
  if (!href) return inner;

  return (
    <NextLink href={href} as={as}>
      {inner}
    </NextLink>
  );
};
