import * as React from "react";
import { ThemeProvider } from "styled-components";

import { definitions } from "./definitions";

export const Theme = ({ children }) => {
  return <ThemeProvider theme={definitions}>{children}</ThemeProvider>;
};
