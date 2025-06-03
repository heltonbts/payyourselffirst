import * as React from "react";
import styled from "styled-components";
import { th } from "@components/Theme/styled";

export const Input = styled("input")`
  background: transparent;
  border: 1px solid #fff;
  border-radius: 200px;
  padding: ${th.space(2)}px ${th.space(1)}px;
  font-size: 16px;
  color: #fff;
`;
