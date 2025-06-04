import * as React from "react";
import { Box, Label, Input } from "@/components/uikit";

export const Field = ({
  type,
  name,
  label,
  flexbox = "column",
  onChange,
  disabled,
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
    </Box>
  );
};
