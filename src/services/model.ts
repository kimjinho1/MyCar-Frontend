import {
  CarInfo,
  CarTypeWithCarInfos,
  GetTrimInfosParam,
  ModelFilters,
  ModelInfo,
  TrimInfo,
} from "@/types/model";
import { apiInstance } from "./instance";

export const getCarInfo = async (carCode: string): Promise<CarInfo> => {
  return await apiInstance.get<CarInfo>(`/model/carInfo/${carCode}`);
};

export const getCarInfos = async (): Promise<CarTypeWithCarInfos[]> => {
  return await apiInstance.get<CarTypeWithCarInfos[]>("/model/carInfos");
};

export const getModelFilters = async (
  carCode: string
): Promise<ModelFilters> => {
  return await apiInstance.get<ModelFilters>(`/model/filters/${carCode}`);
};

export const getModelInfo = async (modelCode: string): Promise<ModelInfo> => {
  return await apiInstance.get<ModelInfo>(`/model/modelInfo/${modelCode}`);
};

export const getTrimInfos = async (
  modelFilters: GetTrimInfosParam
): Promise<TrimInfo[]> => {
  const { carCode, engineCode, missionCode, driveCode } = modelFilters;
  return await apiInstance.get<TrimInfo[]>(
    `/model/trims?carCode=${carCode}&engineCode=${engineCode}&missionCode=${missionCode}&driveCode=${driveCode}`
  );
};
