import { createGlobalStyle } from "styled-components";

import { globalStyle } from "..";

import "sanitize.css/sanitize.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-day-picker/lib/style.css";

export const GlobalStyle = createGlobalStyle`
  ${globalStyle};

  #root {
    height: 100%;
  }
`;
