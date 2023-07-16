import { RecoilRoot } from "recoil";
import GlobalStyle from "@/GlobalStyle";
import Router from "./Router";

/**
 * 색상 컴포넌트 하나 => 2개 거의 똑같음
 * api 공통
 */

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
}

export default App;
