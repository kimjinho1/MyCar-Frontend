import styled from "styled-components";
import {
  selectedIntColorState,
  intColorInfosState,
  selectedExtColorState,
  newIntColorState,
  extColorInfosState,
} from "@/stores/colorState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ChangeableCarModelsWithTrim,
  IntColorInfo,
  getChangeableCarModelsWithTrim,
  getExtColorInfos,
} from "@/apis/color";
import { modelInfoState } from "@/stores";
import { useState } from "react";
import { ChangeTrimModal } from "./ChangeTrimModal";
import {
  BlockedColorBoxDiv,
  OptionDiv,
  ColorBoxDiv,
  OptionTitleDiv,
} from "./styles";

export const IntColor = () => {
  const modelInfo = useRecoilValue(modelInfoState);
  const [selectedIntColor, setSelectedIntColor] = useRecoilState(
    selectedIntColorState
  );
  const intColorInfos = useRecoilValue(intColorInfosState);
  const setNewIntColor = useSetRecoilState(newIntColorState);

  const [selectedExtColor, setSelectedExtColor] = useRecoilState(
    selectedExtColorState
  );
  const setExtColors = useSetRecoilState(extColorInfosState);

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

    if (!intColorInfo.isSelectable) {
      const fetchData = async () => {
        try {
          const data = await getChangeableCarModelsWithTrim(
            modelInfo.code,
            intColorInfo.intColorCode,
            selectedExtColor.code
          );
          setChangeableModelInfo(data);
          setNewIntColor({
            code: intColorCode,
            name: intColorName,
          });
          setIsOpenChangeTrimModal(true);
        } catch (error) {
          alert(error.response.data.message);
        }
      };
      fetchData();
      return;
    }

    setSelectedIntColor({
      code: intColorCode,
      name: intColorName,
    });

    /** 외장색상 정보 */
    const fetchExtColorInfos = async () => {
      try {
        const extColorInfos = await getExtColorInfos(
          modelInfo.code,
          intColorInfo.intColorCode
        );
        setExtColors(extColorInfos);

        const selectableExtColorInfo = extColorInfos.find(
          (extColorInfo) =>
            extColorInfo.isSelectable &&
            extColorInfo.extColorCode === selectedExtColor.code
        );
        if (selectableExtColorInfo) {
          return;
        }
        setSelectedExtColor({
          code: extColorInfos[0].extColorCode,
          name: extColorInfos[0].extColorName,
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchExtColorInfos();
  };

  return (
    <>
      {changeableModelInfo !== undefined && (
        <ChangeTrimModal
          isOpenChangeTrimModal={isOpenChangeTrimModal}
          newModelInfo={changeableModelInfo}
          onClose={onClose}
        />
      )}
      <OptionDiv>
        <OptionTitleDiv>
          <b>내장색상</b>
          <span>{selectedIntColor.name}</span>
        </OptionTitleDiv>
        <IntColorGridDiv>
          {intColorInfos.map((intColorInfo) => {
            if (intColorInfo.isSelectable) {
              return (
                <ColorBoxDiv
                  key={intColorInfo.intColorCode}
                  onClick={() => handleIntColorBtnClick(intColorInfo)}
                  height={"30px"}
                  title={intColorInfo.intColorName}
                  imgurl={
                    import.meta.env.VITE_BACKEND_URL +
                    intColorInfo.intColorImagePath
                  }
                  selected={intColorInfo.intColorCode === selectedIntColor.code}
                ></ColorBoxDiv>
              );
            }

            return (
              <BlockedColorBoxDiv
                key={intColorInfo.intColorCode}
                onClick={() => handleIntColorBtnClick(intColorInfo)}
                height={"30px"}
                title={intColorInfo.intColorName}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  intColorInfo.intColorImagePath
                }
              ></BlockedColorBoxDiv>
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
