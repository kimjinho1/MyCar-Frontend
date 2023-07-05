import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routerPath } from "@/routes";
import { carInfoState, modelInfoState } from "@/stores";
import { getIntColorInfos, getModelInfo } from "@/apis/api";
import { IntColor } from "./IntColor";
import { Preview } from "./Preview";
import { useSetRecoilState } from "recoil";
import { selectedIntColorState, intColorInfosState } from "@/stores/colorState";

export const MakingModelPage = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const setCarInfo = useSetRecoilState(carInfoState);
  const setModelInfo = useSetRecoilState(modelInfoState);
  const setIntColors = useSetRecoilState(intColorInfosState);
  const setSelectedIntColor = useSetRecoilState(selectedIntColorState);

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
          }

          /** 외장색상 정보 */

          /** 옵션 정보 */

          /** TUIX 정보 */
        } catch (error) {
          alert(error.response.data.message);
          navigate(routerPath.ROOT);
        }
      }
    };
    fetchData();
  }, [modelCode]);

  return (
    <MakingModelPageDiv>
      <Preview />
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
