import styled from "styled-components";

export interface OptionBtnProps {
  height: string;
  title: string;
  imgurl: string;
  selected: boolean;
}

export const OptionBtn = styled.button<OptionBtnProps>`
  width: 100%;
  height: ${({ height }) => height};
  border: none;
  cursor: pointer;

  position: relative;
  &:hover:after {
    content: "${({ title }) => title}";
    position: absolute;
    width: auto;
    white-space: nowrap;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 25px;
    background-color: white;
    font-size: 10px;
    border: grey 0.5px solid;
    z-index: 1;
  }

  background-image: url(${({ selected }) =>
      selected ? "/SelectCheck.svg" : ""}),
    url(${({ imgurl }) => imgurl});
  background-size: ${({ selected }) => (selected ? "18px, 100%" : "100%")};
  background-position: ${({ selected }) =>
    selected ? "center, center" : "center"};
  background-repeat: no-repeat;
`;

export const BlockedOptionBtn = styled.button<OptionBtnProps>`
  width: 100%;
  height: ${({ height }) => height};
  border: none;
  cursor: pointer;

  position: relative;
  &:hover:after {
    content: "${({ title }) => title}";
    position: absolute;
    width: auto;
    white-space: nowrap;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 25px;
    background-color: white;
    font-size: 10px;
    border: grey 0.5px solid;
    z-index: 1;
  }

  background-image: url("/Block.svg"),
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${({ imgurl }) => imgurl});
  background-size: 18px, cover, 100%;
  background-position: center, center, center;
  background-repeat: no-repeat;
`;
