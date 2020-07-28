import "@reach/tabs/styles.css";
import "./cssreset.css";
import "./app.css";

import { AppProps } from "next/app";
import React from "react";

// NextJS abhors loading global CSS from places other than _app.js, so we need
// to do some setup for fontawesome icons here.
// https://github.com/FortAwesome/react-fontawesome/tree/920c381aa974eb499f8c9d480b7a2b8f4081c695#integrating-with-other-tools-and-frameworks
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
