import React from "react";
import { Sidebar } from "./Sidebar";
export const MainContentContainer: React.FC = ({ children }) => {
  return (
    <div className={"container"}>
      <div className={"content"}>{children}</div>
      <Sidebar />
    </div>
  );
};
