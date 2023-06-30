import { Outlet } from "react-router-dom";
import { SelectModelHeader } from ".";
import { Footer, MainDiv, MainWrap } from "..";

export const SelectModelLayout = () => {
  return (
    <MainDiv>
      <MainWrap>
        <SelectModelHeader />
        <Outlet />
      </MainWrap>
      <Footer />
    </MainDiv>
  );
};
