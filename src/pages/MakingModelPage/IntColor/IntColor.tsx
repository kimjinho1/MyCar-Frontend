import styled from "styled-components";
import {
  selectedIntColorState,
  intColorInfosState,
  selectedExtColorState,
  newIntColorState,
  extColorInfosState,
} from "@/stores/colorState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Block from "@/assets/svgs/Block.svg";
import SelectCheck from "@/assets/svgs/SelectCheck.svg";
import {
  ChangeableCarModelsWithTrim,
  IntColorInfo,
  getChangeableCarModelsWithTrim,
  getExtColorInfos,
} from "@/apis/api";
import { modelInfoState } from "@/stores";
import { useState } from "react";
import { ChangeTrimModal } from "../ChangeTrimModal";

interface IntColorBtnProps {
  imgurl: string;
}

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

    if (intColorInfo.isSelectable) {
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
            (extColorInfo) => extColorInfo.isSelectable
          );
          console.log(extColorInfos);
          if (selectableExtColorInfo !== undefined) {
            setSelectedExtColor({
              code: selectableExtColorInfo.extColorCode,
              name: selectableExtColorInfo.extColorName,
            });
          }
        } catch (error) {
          alert(error.response.data.message);
        }
      };
      fetchExtColorInfos();
      return;
    }

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
      <IntColorDiv>
        <IntColorTitleDiv>
          <b>내장색상</b>
          <span>{selectedIntColor.name}</span>
        </IntColorTitleDiv>
        <IntColorGridDiv>
          {intColorInfos.map((intColorInfo) => {
            if (!intColorInfo.isSelectable) {
              return (
                <BlockedIntColorBtn
                  key={intColorInfo.intColorCode}
                  onClick={() => handleIntColorBtnClick(intColorInfo)}
                  imgurl={
                    import.meta.env.VITE_BACKEND_URL +
                    intColorInfo.intColorImagePath
                  }
                ></BlockedIntColorBtn>
              );
            }

            if (intColorInfo.intColorCode === selectedIntColor.code) {
              return (
                <SelectedIntColorBtn
                  key={intColorInfo.intColorCode}
                  onClick={() => handleIntColorBtnClick(intColorInfo)}
                  imgurl={
                    import.meta.env.VITE_BACKEND_URL +
                    intColorInfo.intColorImagePath
                  }
                ></SelectedIntColorBtn>
              );
            }

            return (
              <IntColorBtn
                key={intColorInfo.intColorCode}
                onClick={() => handleIntColorBtnClick(intColorInfo)}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  intColorInfo.intColorImagePath
                }
              ></IntColorBtn>
            );
          })}
        </IntColorGridDiv>
      </IntColorDiv>
    </>
  );
};

const IntColorDiv = styled.div`
  width: 90%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntColorTitleDiv = styled.div`
  width: 100%;
  padding-bottom: 12px;
  border-bottom: grey 0.5px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > b {
    margin: 0;
    font-size: 13px;
  }

  > span {
    margin: 0;
    font-size: 10px;
    color: #666;
  }
`;

const IntColorGridDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 10px;
`;

const IntColorBtn = styled.button<IntColorBtnProps>`
  width: 100%;
  height: 30px;
  border: none;
  cursor: pointer;

  background-image: url(${({ imgurl }) => imgurl});
  background-size: 200%;
  background-position: right center;
`;

const SelectedIntColorBtn = styled.button<IntColorBtnProps>`
  width: 100%;
  height: 30px;
  border: none;
  cursor: pointer;

  background-image: url(${SelectCheck}), url(${({ imgurl }) => imgurl});
  background-size: 18px, 200%;
  background-position: center, right center;
  background-repeat: no-repeat;
`;

const BlockedIntColorBtn = styled.button<IntColorBtnProps>`
  width: 100%;
  height: 30px;
  border: none;
  cursor: pointer;

  background-image: url(${Block}),
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${({ imgurl }) => imgurl});
  background-size: 18px, cover, 200%;
  background-position: center, center, right center;
  background-repeat: no-repeat;
`;
