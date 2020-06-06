import React from "react";
import { Header } from "./Header";

export const Page: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};
