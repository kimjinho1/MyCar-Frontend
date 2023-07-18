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
  const data = await apiInstance.get<CarInfo>(`/model/carInfo/${carCode}`);
  return data.data
};

export const getCarInfos = async (): Promise<CarTypeWithCarInfos[]> => {
  const data = await apiInstance.get<CarTypeWithCarInfos[]>("/model/carInfos");
  return data.data
};

export const getModelFilters = async (
  carCode: string
): Promise<ModelFilters> => {
  const data = await apiInstance.get<ModelFilters>(`/model/filters/${carCode}`);
  return data.data
};

export const getModelInfo = async (modelCode: string): Promise<ModelInfo> => {
  const data = await apiInstance.get<ModelInfo>(`/model/modelInfo/${modelCode}`);
  return data.data
};

export const getTrimInfos = async (
  modelFilters: GetTrimInfosParam
): Promise<TrimInfo[]> => {
  const { carCode, engineCode, missionCode, driveCode } = modelFilters;
  const data = await apiInstance.get<TrimInfo[]>(
    `/model/trims?carCode=${carCode}&engineCode=${engineCode}&missionCode=${missionCode}&driveCode=${driveCode}`
  );
  return data.data
};
