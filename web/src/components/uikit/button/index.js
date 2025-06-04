import styled from "styled-components";
import React from "react";
import { ReactComponent as LoadingSvg } from "./loading.svg";

import { th, background, color } from "@components/Theme/styled";

const StyledButton = styled("button")`
  ${background}
  ${color}
  border: transparent;
  border-radius: 200px;
  padding: ${th.space(2)}px ${th.space(8)}px;
  font-size: 16px;
  outline: none;

  ${(props) => props.disabled && "opacity: 0.5;"}
`;

export const Button = ({ disabled, loading, children }) => (
  <StyledButton disabled={disabled || loading}>
    {loading && (
      <LoadingSvg
        style={{
          width: "16px",
          height: "16px",
          marginRight: "8px",
          color: "currentColor",
        }}
      />
    )}
    {loading ? "Carregando..." : children}
  </StyledButton>
);
