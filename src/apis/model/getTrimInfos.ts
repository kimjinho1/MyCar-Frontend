import { apiInstance } from "@/apis/instance";

export type GetTrimInfosParam = {
  carCode: string;
  engineCode: string;
  missionCode: string;
  driveCode: string;
};

export type TrimInfo = {
  modelId: number;
  modelCode: string;
  modelImagePath: string;
  modelPrice: number;
  filterSummary: string;
  trimCode: string;
  trimName: string;
};

export const getTrimInfos = async (
  modelFilters: GetTrimInfosParam
): Promise<TrimInfo[]> => {
  const { carCode, engineCode, missionCode, driveCode } = modelFilters;
  return await apiInstance.get<TrimInfo[]>(
    `/model/trims?carCode=${carCode}&engineCode=${engineCode}&missionCode=${missionCode}&driveCode=${driveCode}`
  );
};
