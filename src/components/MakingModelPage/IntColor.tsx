import { ChangeableCarModelsWithTrim, IntColorInfo } from "@/types/color";
import {
  intColorInfosState,
  selectedExtColorState,
  selectedIntColorState,
} from "@/stores/colorState";
import { modelInfoState } from "@/stores/modelState";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ChangeTrimModal } from "../modal/ChangeTrimModal";
import { OptionDiv, OptionImageBoxDiv, OptionTitleDiv } from "./styles";
import { useUpdateExtColor } from "@/hooks/useUpdateExtColor";
import { useFetchChangeableCarModelWithTrim } from "@/hooks/modal/useFetchChangeableCarModelWithTrim";
import { optionCodesState } from "@/stores/optionState";

export const IntColor = () => {
  const modelInfo = useRecoilValue(modelInfoState);
  const [selectedIntColor, setSelectedIntColor] = useRecoilState(
    selectedIntColorState
  );
  const intColorInfos = useRecoilValue(intColorInfosState);
  const selectedExtColor = useRecoilValue(selectedExtColorState);
  const optionCodes = useRecoilValue(optionCodesState);

  const updateExtColor = useUpdateExtColor();
  const fetchChangeableCarModelWithTrim = useFetchChangeableCarModelWithTrim();

  // 모달 관리
  const [isOpenChangeTrimModal, setIsOpenChangeTrimModal] =
    useState<boolean>(false);
  const onClose = () => {
    setIsOpenChangeTrimModal(false);
  };
  const [changeableModelInfo, setChangeableModelInfo] =
    useState<ChangeableCarModelsWithTrim>();

  const handleIntColorBtnClick = (intColorInfo: IntColorInfo) => {
    const intColorCode = intColorInfo.intColorCode;
    const intColorName = intColorInfo.intColorName;
    const intColorImagePath = intColorInfo.intColorImagePath;

    if (intColorCode === selectedIntColor.code) {
      return;
    }

    /** 트림 변경 모달 정보 세팅 */
    if (!intColorInfo.isSelectable) {
      fetchChangeableCarModelWithTrim(
        modelInfo.code,
        {
          code: intColorCode,
          name: intColorName,
          imagePath: intColorImagePath,
        },
        selectedExtColor,
        optionCodes,
        setIsOpenChangeTrimModal,
        setChangeableModelInfo
      );
      return;
    }

    /** 내장색상 업데이트 */
    setSelectedIntColor({
      code: intColorCode,
      name: intColorName,
      imagePath: intColorImagePath,
    });

    /** 외장색상 업데이트 */
    updateExtColor(modelInfo.code, intColorCode);
  };

  return (
    <>
      {changeableModelInfo !== undefined && isOpenChangeTrimModal && (
        <ChangeTrimModal newModelInfo={changeableModelInfo} onClose={onClose} />
      )}
      <OptionDiv>
        <OptionTitleDiv>
          <b>내장색상</b>
          <span>{selectedIntColor.name}</span>
        </OptionTitleDiv>
        <IntColorGridDiv>
          {intColorInfos.map((intColorInfo) => {
            return (
              <OptionImageBoxDiv
                key={intColorInfo.intColorCode}
                onClick={() => handleIntColorBtnClick(intColorInfo)}
                height={"30px"}
                title={intColorInfo.intColorName}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  intColorInfo.intColorImagePath
                }
                hover={true}
                isBlocked={!intColorInfo.isSelectable}
                isSelected={intColorInfo.intColorCode === selectedIntColor.code}
              />
            );
          })}
        </IntColorGridDiv>
      </OptionDiv>
    </>
  );
};

const IntColorGridDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 10px;
`;
