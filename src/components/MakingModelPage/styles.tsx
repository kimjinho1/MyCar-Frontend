import styled from "styled-components";

export interface ColorBoxDivProps {
  height: string;
  title: string;
  imgurl: string;
  hover: boolean;
  selected: boolean;
}

export const OptionDiv = styled.div`
  width: 90%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h2 {
    margin: 15px 0;
    align-self: flex-start;
    font-size: 20px;
  }
`;

export const OptionTitleDiv = styled.div`
  width: 100%;
  padding-bottom: 12px;
  border-bottom: grey 0.5px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > b {
    font-size: 13px;
  }

  > span {
    margin: 0;
    font-size: 10px;
    color: #666;
  }
`;

export const ColorBoxDiv = styled.div<ColorBoxDivProps>`
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

export const BlockedColorBoxDiv = styled.button<ColorBoxDivProps>`
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
