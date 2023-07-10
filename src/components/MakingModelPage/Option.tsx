import styled from "styled-components";
import {
  ExtendedOptionInfo,
  modelInfoState,
  optionsState,
  selectedOptionState,
} from "@/stores";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OptionDiv, OptionTitleDiv } from "./styles";

export interface OptionBoxDivProps {
  imgurl: string;
  selected: boolean;
}

export const Option = () => {
  const modelInfo = useRecoilValue(modelInfoState);
  const options = useRecoilValue(optionsState);
  const setSelectOption = useSetRecoilState(selectedOptionState);

  const handleIntColorBtnClick = (option: ExtendedOptionInfo) => {
    setSelectOption(option.optionCode);
  };

  return (
    <OptionDiv>
      <h2>옵션</h2>
      <OptionTitleDiv>
        <b>상세 품목</b>
      </OptionTitleDiv>
      <OptionGridDiv>
        {options.map((option) => {
          if (option.isSelectable) {
            return (
              <OptionBoxDiv
                key={option.optionCode}
                onClick={() => handleIntColorBtnClick(option)}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL + option.optionImagePath
                }
                selected={option.isSelected}
              ></OptionBoxDiv>
            );
          }
        })}
      </OptionGridDiv>
    </OptionDiv>
  );
};

const OptionGridDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 15px;
`;

export const OptionBoxDiv = styled.div<OptionBoxDivProps>`
  width: 100%;
  height: 100px;
  border: none;
  cursor: pointer;

  background-image: url(${({ selected }) =>
      selected ? "/SelectCheck.svg" : ""}),
    url(${({ imgurl }) => imgurl});
  background-size: ${({ selected }) => (selected ? "18px, 100%" : "100%")};
  background-position: ${({ selected }) =>
    selected ? "center, center" : "center"};
  background-repeat: no-repeat;
`;
