import styled from "styled-components";

type HorizontalLineProps = {
  height: number;
};

export const HorizontalLine = styled.div<HorizontalLineProps>`
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: grey;
`;
