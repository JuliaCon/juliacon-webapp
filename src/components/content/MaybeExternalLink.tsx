import React from "react";
import { ExternalLink } from "./ExternalLink";

interface MaybeExternalLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string | null | undefined;
}
export const MaybeExternalLink = ({
  children,
  className,
  href,
}: MaybeExternalLinkProps) => {
  return href ? (
    <ExternalLink href={href} className={className}>
      {children}
    </ExternalLink>
  ) : (
    <>{children}</>
  );
};
