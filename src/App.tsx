import { RecoilRoot } from "recoil";
import GlobalStyle from "@/GlobalStyle";
import Router from "./Router";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
}

export default App;
