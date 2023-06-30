import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { routerPath } from "@/routes";
import { CarInfoState, modelInfoState } from "@/stores";
import { getModelInfo } from "@/apis/api";

export const SelectOptionPage = () => {
  const { modelCode } = useParams();
  const [carInfo, setCarInfo] = useRecoilState(CarInfoState);
  const [modelInfo, setModelInfo] = useRecoilState(modelInfoState);
  const navigate = useNavigate();

  useEffect(() => {
    const get = async () => {
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
          });
        } catch (error) {
          navigate(routerPath.ROOT);
        }
      }
    };
    get();
  }, [modelCode]);

  return (
    <div>
      <h2>차량 옵션 선택 페이지</h2>
      <h3>차량 모델 코드: {modelInfo.code}</h3>
      <h3>차량 코드: {carInfo.code}</h3>
      <h3>차량 모델 이름: {modelInfo.fullName}</h3>
      <h3>차량 모델 이름-트림: {modelInfo.name}</h3>
      <h3>차량 모델 가격: {modelInfo.price}</h3>
    </div>
  );
};
