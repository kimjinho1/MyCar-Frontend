import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { routerPath } from "@/routes";
import { carInfoState, modelInfoState } from "@/stores";
import { getModelInfo } from "@/apis/api";
import { Preview } from "./Preview";
import { IntColor } from "./IntColor";

export const MakingModelPage = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const [carInfo, setCarInfo] = useRecoilState(carInfoState);
  const [modelInfo, setModelInfo] = useRecoilState(modelInfoState);

  useEffect(() => {
    const fetchData = async () => {
      if (modelCode !== undefined) {
        try {
          const data = await getModelInfo(modelCode);
          setCarInfo({
            code: data.carCode,
            name: data.carName,
          });
          setModelInfo({
            code: data.modelCode,
            fullName: data.modelName,
            name: `${data.carName} - ${data.trimName}`,
            price: data.modelPrice,
            imagePath: data.modelImagePath,
          });
        } catch (error) {
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
