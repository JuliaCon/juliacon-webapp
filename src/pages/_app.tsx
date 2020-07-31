import "@reach/tabs/styles.css";
import "./cssreset.css";
import "./app.css";

import { AppProps } from "next/app";
import React from "react";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
