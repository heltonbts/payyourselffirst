import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { Field, Box, Button } from "@/components";

const Main = styled(Box)`
  justify-content: center;
  align-items: center;
`;

export const Signup = () => {
  const [values, setValues] = useState({});

  const [loading, Setloading] = useState(false);

  const onChange = (ev) => {
    setValues((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    console.log(values);
    Setloading(true);

    const result = await axios.post("http://localhost:3001/users", values);
    Setloading(false);
  };

  return (
    <Main as="main" flexbox="column" flex={1} center>
      <Box style={{ width: 380 }}>
        <form onSubmit={onSubmit}>
          <Field
            type="text"
            name="name"
            label="Nome"
            mb={3}
            flex={1}
            onChange={onChange}
            disabled={loading}
          />
          <Field
            type="text"
            name="email"
            label="E-mail"
            mb={3}
            disabled={loading}
            onChange={onChange}
          />
          <Field
            type="password"
            name="password"
            label="Senha"
            mb={3}
            disabled={loading}
            onChange={onChange}
          />
          <Box flexbox center>
            <Button loading={loading}>Registrar</Button>
          </Box>
        </form>
      </Box>
    </Main>
  );
};
