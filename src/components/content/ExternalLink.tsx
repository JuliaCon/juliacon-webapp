import React from "react";

interface ExternalLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}
export const ExternalLink = ({
  children,
  className,
  href,
}: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target={"_blank"}
      rel={"noopener noreferrer"}
      className={className}
    >
      {children}
    </a>
  );
};
