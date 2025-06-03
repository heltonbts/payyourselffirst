import * as React from "react";
import styled from "styled-components";
import { padding, margin, flexbox } from "@components/Theme/styled";
import { background } from "../../Theme/styled";

export const Box = styled("div")`
  ${padding};
  ${margin};
  ${flexbox};
  ${background};
`;
