import * as React from "react";
import styled from "styled-components";
import { th } from "@components/Theme/styled";
import { Box, Label, Input } from "@/components/uikit";

const ErrorMenssage = styled(Box)`
  color: red;
  padding: ${th.space(1)}px ${th.space(3)}px;
  font-size: 12px;
`;

export const Field = ({
  type,
  name,
  label,
  flexbox = "column",
  onChange,
  disabled,
  error,
  ...props
}) => {
  return (
    <Box {...props} flexbox={flexbox}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <ErrorMenssage>{error}</ErrorMenssage>}
    </Box>
  );
};
