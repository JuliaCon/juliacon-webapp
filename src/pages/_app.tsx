import { AppProps } from "next/app";

import "./cssreset.css";
import React from "react";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
