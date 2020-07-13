import "@reach/tabs/styles.css";
import "./cssreset.css";
import "./app.css";

import { AppProps } from "next/app";
import React, { useState } from "react";
import { TimezoneContext } from "../const";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [timezone, setTimezone] = useState("+00:00");

  return (
    <TimezoneContext.Provider
      value={{
        timezone: timezone,
        changeTimezone: setTimezone,
      }}
    >
      <Component {...pageProps} />
    </TimezoneContext.Provider>
  );
};

export default App;
