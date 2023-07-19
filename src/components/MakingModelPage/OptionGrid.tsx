import { useImageUrl } from "@/hooks/utils/useImageUrl";
import { optionCodesState } from "@/stores/optionState";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { OptionImageBoxDiv } from "./styles";
import { OptionInfo } from "@/types/option";
import { useUpdateOption } from "@/hooks/modal/useUpdateOption";
import { useState } from "react";
import { useFetchChangeOption } from "@/hooks/modal/useFetchAddOption";
import { modelInfoState } from "@/stores/modelState";
import { AddDelOptionModal } from "../modal/AddDelOptionModal";

type OptionGridProps = {
  options: OptionInfo[];
};

export type OptionGridWrapProps = {
  isSelected: boolean;
};

export const OptionGrid = ({ options }: OptionGridProps) => {
  const modelInfo = useRecoilValue(modelInfoState);
  const optionCodes = useRecoilValue(optionCodesState);
  const updateOption = useUpdateOption();

  const fetchChangeOption = useFetchChangeOption();

  // 모달 관리
  const [isOpenAddDelOptionModal, setIsOpenAddDelOptionModal] =
    useState<boolean>(false);
  const onClose = () => {
    setIsOpenAddDelOptionModal(false);
  };

  const handleOptionClick = (option: OptionInfo) => {
    const isPressed = !optionCodes.has(option.optionCode);
    /**
     * 종속성이 있는 옵션들을 선택 취소하려는 경우 못하게 막음
     * EX) 세이지그린 인테리어 컬러, 인테리어디자인2
     */
    if (isPressed === false && option.isDeselectable) {
      return;
    }
    /** 선택 불가능한 옵션 */
    if (!option.isSelectable) {
      fetchChangeOption(modelInfo.code, option, setIsOpenAddDelOptionModal);
      return;
    }

    updateOption(option.optionCode, isPressed);
  };

  return (
    <>
      {isOpenAddDelOptionModal && modelInfo && modelInfo.code && (
        <AddDelOptionModal modelCode={modelInfo.code} onClose={onClose} />
      )}
      <OptionGridDiv>
        {options.map((option) => {
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
    </>
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
  shouldForwardProp: (prop) =>
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
