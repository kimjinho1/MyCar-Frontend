import styled from "styled-components";

import { Outlet } from "react-router-dom";
import { MainHeader } from ".";
import { Footer } from "..";

export const MainLayout = () => {
  return (
    <MainDiv>
      <MainWrap>
        <MainHeader />
        <Outlet />
      </MainWrap>
      <Footer />
    </MainDiv>
  );
};

export const MainDiv = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const MainWrap = styled.div`
  padding-bottom: 120px;
`;
