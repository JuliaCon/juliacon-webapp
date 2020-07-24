import React from "react";
import { Sidebar } from "./Sidebar";
export const MainContentContainer: React.FC = ({ children }) => {
  return (
    <div className={"sdff"}>
      <div className={"content"}>{children}</div>
      <Sidebar />
    </div>
  );
};
