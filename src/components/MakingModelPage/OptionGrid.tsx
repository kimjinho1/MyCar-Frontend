import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { OptionImageBoxDiv } from "./styles";
import { ExtendedOptionInfo, selectedOptionState } from "@/stores";
import shouldForwardProp from "@styled-system/should-forward-prop";

interface OptionGridProps {
  options: ExtendedOptionInfo[];
}

export interface OptionGridWrapProps {
  isSelected: boolean;
}

export const OptionGrid = ({ options }: OptionGridProps) => {
  const setSelectOption = useSetRecoilState(selectedOptionState);

  const handleIntColorBtnClick = (option: ExtendedOptionInfo) => {
    if (!option.isSelectable) {
      return;
    }
    setSelectOption(option.optionCode);
  };

  return (
    <OptionGridDiv>
      {options.map((option) => {
        return (
          <OptionGridWrap
            key={option.optionCode}
            onClick={() => handleIntColorBtnClick(option)}
            isSelected={option.isSelected}
          >
            <OptionImageBoxDiv
              height={"100px"}
              title={option.optionName}
              imgurl={import.meta.env.VITE_BACKEND_URL + option.optionImagePath}
              hover={false}
              isBlocked={!option.isSelectable}
              isSelected={option.isSelected}
            />
            <OptionInfoDiv>
              <p>{option.optionName}</p>
              <span>{option.optionPrice.toLocaleString()} 원</span>
            </OptionInfoDiv>
          </OptionGridWrap>
        );
      })}
    </OptionGridDiv>
  );
};

const OptionGridDiv = styled.div`
  width: 100%;
  margin: 15px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 15px;
`;

const OptionGridWrap = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    shouldForwardProp(prop) && !["isSelected"].includes(prop),
})<OptionGridWrapProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.isSelected
      ? `border: #007FA8 1px solid;`
      : `border: grey 0.5px solid;`}

  > img {
    width: 100%;
    object-fit: cover;
  }
`;

const OptionInfoDiv = styled.div`
  width: 80%;
  height: 80px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  justify-content: space-between;

  > p {
    align-self: flex-start;
    margin: 0;
    font-weight: 500;
    font-size: 10px;
  }

  > span {
    align-self: flex-start;
    font-size: 10px;
    color: #666;
  }
`;
