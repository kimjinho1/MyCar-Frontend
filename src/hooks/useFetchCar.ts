import { ROUTE_PATH } from "@/Router";
import { getCarInfo } from "@/services/model";
import { carInfoState } from "@/stores/carState";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

export const useFetchCar = () => {
  const { carCode } = useParams();
  const setCarInfo = useSetRecoilState(carInfoState);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (carCode !== undefined) {
        try {
          const car = await getCarInfo(carCode);
          setCarInfo({
            code: car.carCode,
            name: car.carName,
          });
        } catch (error) {
          navigate(ROUTE_PATH.ROOT);
        }
      }
    };
    fetchData();
  }, [carCode]);
};
