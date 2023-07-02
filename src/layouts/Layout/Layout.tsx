import React from "react";
import styled from "styled-components";
import { Footer } from "..";

type LayoutProps = {
  children: React.ReactNode;
  header: React.ReactNode;
};

export const Layout = ({ children, header }: LayoutProps) => {
  return (
    <LayoutDiv>
      <LayoutWrap>
        {header}
        {children}
      </LayoutWrap>
      <Footer />
    </LayoutDiv>
  );
};

export const LayoutDiv = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const LayoutWrap = styled.div`
  padding-bottom: 120px;
`;
