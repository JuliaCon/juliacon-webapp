import * as React from "react";
import Markdown from "react-markdown";

export const StyledMarkdown = ({ source }: { source: string }) => {
  return (
    <div className="styled-markdown">
      <Markdown children={source} />
    </div>
  );
};
