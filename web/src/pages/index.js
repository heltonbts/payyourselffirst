import * as React from "react";
import { Signup } from "./singup/index.js";
import { Theme } from "@components";

export const App = () => {
  return (
    <Theme>
      <Signup />
    </Theme>
  );
};
