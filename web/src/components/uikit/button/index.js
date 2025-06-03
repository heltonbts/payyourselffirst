import styled from "styled-components";

import { th, background, color } from "@components/Theme/styled";

export const Button = styled("button")`
  ${background}
  ${color}
  border: transparent;
  border-radius: 200px;
  padding: ${th.space(2)}px ${th.space(8)}px;
  font-size: 16px;
  outline: none;
`;
