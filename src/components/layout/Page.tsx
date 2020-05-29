import React from "react";

export const Page: React.FC = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
