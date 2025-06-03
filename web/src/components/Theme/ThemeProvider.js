import * as React from "react";
import { ThemeProvider } from "styled-components";

import { definitions } from "./definitions";
import { GlobalStyle } from "./GlobalStyle";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={definitions}>
      {children}
      <GlobalStyle bg="raisinBlack" color="white" />
    </ThemeProvider>
  );
};
