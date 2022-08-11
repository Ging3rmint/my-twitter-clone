import * as ReactDOM from "react-dom";

import { GlobalStyle } from "@styled";

import App from "./App";

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root") as HTMLElement
);
