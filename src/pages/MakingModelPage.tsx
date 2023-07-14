import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  selectedIntColorState,
  intColorInfosState,
  extColorInfosState,
  selectedExtColorState,
} from "@/stores/colorState";
import {
  MakingModelHeader,
  Preview,
  ExtColor,
  IntColor,
  Option,
} from "../components/MakingModelPage";
import { getExtColorInfos, getIntColorInfos } from "@/apis/color";
import { getOptions } from "@/apis/option";
import { getModelInfo } from "@/apis/model";
import { carInfoState } from "@/stores/carState";
import { modelInfoState } from "@/stores/modelState";
import { optionsState } from "@/stores/optionState";
import { ROUTE_PATH } from "@/Router";

export const MakingModelPage = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const setCarInfo = useSetRecoilState(carInfoState);
  const setModelInfo = useSetRecoilState(modelInfoState);

  const setIntColors = useSetRecoilState(intColorInfosState);
  const setSelectedIntColor = useSetRecoilState(selectedIntColorState);
  const setExtColors = useSetRecoilState(extColorInfosState);
  const setSelectedExtColor = useSetRecoilState(selectedExtColorState);

  const setOptions = useSetRecoilState(optionsState);

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
          setSelectedIntColor({
            code: intColorInfos[0].intColorCode,
            name: intColorInfos[0].intColorName,
          });

          /** 외장색상 정보 */
          const extColorInfos = await getExtColorInfos(
            modelCode,
            intColorInfos[0].intColorCode
          );
          setExtColors(extColorInfos);
          setSelectedExtColor({
            code: extColorInfos[0].extColorCode,
            name: extColorInfos[0].extColorName,
          });

          /** 옵션 정보 */
          const options = await getOptions(modelCode);
          setOptions(
            options.map((option) => {
              return {
                ...option,
                isSelected: false,
              };
            })
          );
        } catch (error) {
          alert(error.response.data.message);
          navigate(ROUTE_PATH.ROOT);
        }
      }
    };
    fetchData();
  }, [modelCode]);

  return (
    <MakingModelPageDiv>
      <MakingModelHeader />
      <MakingModelPageWrap>
        <Preview />
        <ExtColor />
        <IntColor />
        <Option />
      </MakingModelPageWrap>
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

const MakingModelPageWrap = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
