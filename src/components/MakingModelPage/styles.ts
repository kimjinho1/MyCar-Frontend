import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";

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

export interface OptionImageBoxDivProps {
  height: string;
  title: string;
  imgurl: string;
  hover: boolean;
  isBlocked: boolean;
  isSelected: boolean;
}

export const OptionImageBoxDiv = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) &&
    !["hover", "isBlocked", "isSelected"].includes(prop),
})<OptionImageBoxDivProps>`
  width: 100%;
  height: ${(props) => props.height};
  border: none;
  cursor: pointer;

  ${(props) =>
    props.hover &&
    `
    position: relative;
    &:hover:after {
      content: "${props.title}";
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
  `}

  background-image: url(${(props) => props.imgurl});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  ${(props) =>
    props.isBlocked &&
    `
    background-image: url("/Block.svg"),
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props.imgurl});
    background-size: 18px, cover, 100% 100%;
    background-position: center, center, center;
  `}

  ${(props) =>
    props.isSelected &&
    `
    background-image: url("/SelectCheck.svg"), url(${props.imgurl});
    background-size: 18px, 100% 100%;
    background-position: center, center; 
  `}
`;
