import * as React from "react";
import styled from "styled-components";
import { background } from "@components/Theme/styled";

import { Field, Box } from "@/components";

const Main = styled(Box)`
  justify-content: center;
  align-items: center;
`;

export const Signup = () => {
  return (
    <Main as="main" flexbox="column" flex={1} center>
      <Box style={{ width: 380 }}>
        <Field type="text" name="nome" label="Nome" mb={3} flex={1} />
        <Field type="text" name="email" label="E-mail " mb={3} />
        <Field type="password" name="senha" label="Senha" />
      </Box>
    </Main>
  );
};
