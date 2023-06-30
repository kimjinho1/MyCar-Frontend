import { Outlet } from "react-router-dom";
import { MakingModelHeader } from ".";
import { Footer, MainDiv, MainWrap } from "..";

export const MakingModelLayout = () => {
  return (
    <MainDiv>
      <MainWrap>
        <MakingModelHeader />
        <Outlet />
      </MainWrap>
      <Footer />
    </MainDiv>
  );
};
