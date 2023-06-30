import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CarInfo } from "../apis/api";
import { API_ROUTES } from "@/apis/constants/API_ROUTES";
import { apiInstance } from "@/apis/instance";
import { routerPath } from "@/routes";
import { CarInfoState } from "@/stores/carState";

export const SelectModelPage = () => {
  const { carCode } = useParams();
  const [carInfo, setCarInfo] = useRecoilState(CarInfoState);
  const navigate = useNavigate();

  useEffect(() => {
    const getCarInfo = async () => {
      try {
        const data: CarInfo = await apiInstance.get(
          `${API_ROUTES.CARINFO}/${carCode}`
        );
        setCarInfo({
          code: data.carCode,
          name: data.carName,
        });
      } catch (error) {
        navigate(routerPath.ROOT);
      }
    };
    getCarInfo();
  }, [carCode]);

  return (
    <div>
      <h2>차량 모델 선택 페이지</h2>
      <h3>차량 코드: {carInfo.code}</h3>
      <h3>차량 이름: {carInfo.name}</h3>
    </div>
  );
};
