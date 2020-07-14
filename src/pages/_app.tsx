import { AppProps } from "next/app";

import "./cssreset.css";
import "./app.css";
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
