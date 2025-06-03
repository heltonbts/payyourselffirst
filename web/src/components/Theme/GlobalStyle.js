import { createGlobalStyle } from "styled-components";
import { background, color, th } from "./styled";

export const GlobalStyle = createGlobalStyle`
body, html, #root {
height: 100%
};

body {
${background}
${color}

  margin: 0;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
};

#root {
display: flex;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
    input {
    outline: none;
    }`;
