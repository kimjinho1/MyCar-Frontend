import React from "react";
import styled from "styled-components";
import { Footer } from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutDiv>
      <LayoutWrap>{children}</LayoutWrap>
      <Footer />
    </LayoutDiv>
  );
};

export const LayoutDiv = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const LayoutWrap = styled.div`
  padding-bottom: 150px;
`;
