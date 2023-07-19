import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
  }
  body {
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 16px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  p {
    margin: 0;
  }
`;
export default GlobalStyle;
