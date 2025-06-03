import * as React from "react";
import { Box, Label, Input } from "@/components/uikit";

export const Field = ({ type, name, label, flexbox = "column", ...props }) => (
  <Box {...props} flexbox={flexbox}>
    <Label htmlFor={name}>{label}</Label>
    <Input type={type} id={name} />
  </Box>
);
