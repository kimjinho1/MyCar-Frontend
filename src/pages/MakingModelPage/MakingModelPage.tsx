import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { carInfoState, modelInfoState } from "@/stores";
import { getExtColorInfos, getIntColorInfos, getModelInfo } from "@/apis";
import { useSetRecoilState } from "recoil";
import {
  selectedIntColorState,
  intColorInfosState,
  extColorInfosState,
  selectedExtColorState,
} from "@/stores/colorState";
import { MakingModelHeader } from "@/layouts/MakingModelHeader";
import { Preview, ExtColor, IntColor } from ".";

export const MakingModelPage = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const setCarInfo = useSetRecoilState(carInfoState);
  const setModelInfo = useSetRecoilState(modelInfoState);
  const setIntColors = useSetRecoilState(intColorInfosState);
  const setSelectedIntColor = useSetRecoilState(selectedIntColorState);
  const setExtColors = useSetRecoilState(extColorInfosState);
  const setSelectedExtColor = useSetRecoilState(selectedExtColorState);

  useEffect(() => {
    const fetchData = async () => {
      if (modelCode !== undefined) {
        try {
          /** 모델 정보 */
          const modelData = await getModelInfo(modelCode);
          setCarInfo({
            code: modelData.carCode,
            name: modelData.carName,
          });
          setModelInfo({
            code: modelData.modelCode,
            fullName: modelData.modelName,
            carName: modelData.carName,
            trimName: modelData.trimName,
            price: modelData.modelPrice,
            imagePath: modelData.modelImagePath,
          });

          /** 내장색상 정보 */
          const intColorInfos = await getIntColorInfos(modelCode);
          setIntColors(intColorInfos);
          const selectableIntColorInfo = intColorInfos.find(
            (intColorInfo) => intColorInfo.isSelectable
          );
          if (selectableIntColorInfo !== undefined) {
            setSelectedIntColor({
              code: selectableIntColorInfo.intColorCode,
              name: selectableIntColorInfo.intColorName,
            });

            /** 외장색상 정보 */
            const extColorInfos = await getExtColorInfos(
              modelCode,
              selectableIntColorInfo.intColorCode
            );
            setExtColors(extColorInfos);
            const selectableExtColorInfo = extColorInfos.find(
              (extColorInfo) => extColorInfo.isSelectable
            );
            if (selectableExtColorInfo !== undefined) {
              setSelectedExtColor({
                code: selectableExtColorInfo.extColorCode,
                name: selectableExtColorInfo.extColorName,
              });
            }
          }

          /** 옵션 정보 */

          /** TUIX 정보 */
        } catch (error) {
          alert(error.response.data.message);
          navigate("/");
        }
      }
    };
    fetchData();
  }, [modelCode]);

  return (
    <MakingModelPageDiv>
      <MakingModelHeader />
      <Preview />
      <ExtColor />
      <IntColor />
    </MakingModelPageDiv>
  );
};

const MakingModelPageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
