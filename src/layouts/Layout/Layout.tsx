import React from "react";
import styled from "styled-components";
import { Footer } from "..";

type LayoutProps = {
  children: React.ReactNode;
  header: React.ReactNode;
};

export const Layout = ({ children, header }: LayoutProps) => {
  return (
    <MainDiv>
      <MainWrap>
        {header}
        {children}
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
