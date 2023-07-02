import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { routerPath } from "@/routes";
import {
  driveCodeState,
  engineCodeState,
  missionCodeState,
  carInfoState,
  modelFiltersState,
} from "@/stores";
import { getCarInfo } from "@/apis/api";
import { FilterList } from "./FilterList";
import { getModelFilters } from "@/apis/api/getModelFilters";
import { useEffect } from "react";

export const SelectModelPage = () => {
  const { carCode } = useParams();
  const navigate = useNavigate();

  const [carInfo, setCarInfo] = useRecoilState(carInfoState);
  const setModelFilters = useSetRecoilState(modelFiltersState);
  const setEngineCode = useSetRecoilState(engineCodeState);
  const setMissionCode = useSetRecoilState(missionCodeState);
  const setDriveCode = useSetRecoilState(driveCodeState);

  useEffect(() => {
    const fetchData = async () => {
      if (carCode !== undefined) {
        try {
          const car = await getCarInfo(carCode);
          setCarInfo({
            code: car.carCode,
            name: car.carName,
          });

          const modelFilters = await getModelFilters(carCode);
          setModelFilters(modelFilters);
          setEngineCode(modelFilters.engines[0].engineCode);
          setMissionCode(modelFilters.missions[0].missionCode);
          if (modelFilters.drives.length > 0) {
            setDriveCode(modelFilters.drives[0].driveCode);
          }
        } catch (error) {
          navigate(routerPath.ROOT);
        }
      }
    };
    fetchData();
  }, [carCode]);

  return (
    <div>
      <FilterList />
      <h2>차량 모델 선택 페이지</h2>
      <h3>차량 코드: {carInfo.code}</h3>
      <h3>차량 이름: {carInfo.name}</h3>
    </div>
  );
};
