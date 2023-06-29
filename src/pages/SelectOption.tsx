import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ModelInfo } from "../apis/api";
import { CarInfoState } from "../stores/carState";
import { modelInfoState } from "../stores/modelState";
import { API_ROUTES } from "@/apis/constants/API_ROUTES";
import { apiInstance } from "@/apis/instance";

const SelectOption = () => {
  const { modelCode } = useParams();
  const [carInfo, setCarInfo] = useRecoilState(CarInfoState);
  const [modelInfo, setModelInfo] = useRecoilState(modelInfoState);
  const navigate = useNavigate();

  useEffect(() => {
    const getModelInfo = async () => {
      try {
        const data: ModelInfo = await apiInstance.get(
          `${API_ROUTES.MODELINFO}/${modelCode}`
        );
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
        navigate("/");
      }
    };
    getModelInfo();
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

export default SelectOption;
