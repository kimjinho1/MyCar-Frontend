import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { carInfoState } from "@/stores/carState";
import {
  driveCodeState,
  engineCodeState,
  missionCodeState,
  modelFiltersState,
  trimInfosState,
} from "@/stores/modelState";
import { useEffect } from "react";
import {
  SelectModelHeader,
  FilterList,
  NoticeList,
  TrimList,
} from "../components/SelectModelPage";
import { getCarInfo, getModelFilters, getTrimInfos } from "@/apis/model";

export const SelectModelPage = () => {
  const { carCode } = useParams();
  const navigate = useNavigate();

  const setCarInfo = useSetRecoilState(carInfoState);
  const setModelFilters = useSetRecoilState(modelFiltersState);
  const setEngineCode = useSetRecoilState(engineCodeState);
  const setMissionCode = useSetRecoilState(missionCodeState);
  const setDriveCode = useSetRecoilState(driveCodeState);
  const setTrimInfos = useSetRecoilState(trimInfosState);

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
          const engineCode = modelFilters.engines[0].engineCode;
          const missionCode = modelFilters.missions[0].missionCode;
          const driveCode =
            modelFilters.drives.length > 0
              ? modelFilters.drives[0].driveCode
              : "";
          setModelFilters(modelFilters);
          setEngineCode(engineCode);
          setMissionCode(missionCode);
          setDriveCode(driveCode);

          const getTrimInfosParam = {
            carCode: carCode,
            engineCode: engineCode,
            missionCode: missionCode,
            driveCode: driveCode,
          };
          const trimInfos = await getTrimInfos(getTrimInfosParam);
          setTrimInfos(trimInfos);
        } catch (error) {
          navigate("/");
        }
      }
    };
    fetchData();
  }, [carCode]);

  return (
    <SelectModelPageDiv>
      <SelectModelHeader />
      <FilterList />
      <TrimList />
      <NoticeList />
    </SelectModelPageDiv>
  );
};

const SelectModelPageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
