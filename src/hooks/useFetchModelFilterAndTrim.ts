import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  driveCodeState,
  engineCodeState,
  missionCodeState,
  modelFiltersState,
  trimInfosState,
} from "@/stores/modelState";
import { getModelFilters, getTrimInfos } from "@/services/model";
import { useEffect } from "react";
import { setErrorModalInfoState } from "@/stores/modalState";

export const useFetchModelFilterAndTrim = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);
  const { carCode } = useParams();

  const setModelFilters = useSetRecoilState(modelFiltersState);
  const setEngineCode = useSetRecoilState(engineCodeState);
  const setMissionCode = useSetRecoilState(missionCodeState);
  const setDriveCode = useSetRecoilState(driveCodeState);
  const setTrimInfos = useSetRecoilState(trimInfosState);

  useEffect(() => {
    const fetchData = async () => {
      if (carCode !== undefined) {
        try {
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
        } catch (error: any) {
          setErrorModalInfo({
            messages: error.response.data.message,
            isRedirect: true,
          });
        }
      }
    };
    fetchData();
  }, [carCode]);
};
