import { useImageUrl } from "@/hooks/useImageUrl";
import { optionCodesState, selectOptionState } from "@/stores/optionState";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { OptionImageBoxDiv } from "./styles";
import { OptionInfo, OPTION_TYPE } from "@/types/option";
import { useParams } from "react-router-dom";
import { useUpdateOption } from "@/hooks/useUpdateOption";

interface OptionGridProps {
  options: OptionInfo[];
}

export interface OptionGridWrapProps {
  isSelected: boolean;
}

export const OptionGrid = ({ options }: OptionGridProps) => {
  const { modelCode } = useParams();
  const optionCodes = useRecoilValue(optionCodesState);
  const updateOption = useUpdateOption();

  const handleOptionClick = (option: OptionInfo) => {
    if (!option.isSelectable) {
      return;
    }

    updateOption(modelCode, option.optionCode);
  };

  return (
    <OptionGridDiv>
      {options.map((option) => {
        if (
          option.optionTypeName !== OPTION_TYPE.DETAIL &&
          option.isSelectable === false
        ) {
          return null;
        }
        return (
          <OptionGridWrap
            key={option.optionCode}
            onClick={() => handleOptionClick(option)}
            isSelected={optionCodes.has(option.optionCode)}
          >
            <OptionImageBoxDiv
              height={"100px"}
              title={option.optionName}
              imgurl={useImageUrl(option.optionImagePath)}
              hover={false}
              isBlocked={!option.isSelectable}
              isSelected={optionCodes.has(option.optionCode)}
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
  height: 70px;
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
    font-size: 11px;
    color: #666;
  }
`;
