import { apiInstance } from "@/apis/instance";
import { apiRouterPath } from "@/apis/constants/apiRouterPath";

export type Engine = {
  engineId: number;
  engineCode: string;
  engineName: string;
};

export type Mission = {
  missionId: number;
  missionCode: string;
  missionName: string;
};

export type Drive = {
  driveId: number;
  driveCode: string;
  driveName: string;
};

export type ModelFilters = {
  engines: Engine[];
  missions: Mission[];
  drives: Drive[];
};

export const getModelFilters = async (
  carCode: string
): Promise<ModelFilters> => {
  return await apiInstance.get<ModelFilters>(
    apiRouterPath.getModelFiltersPath(carCode)
  );
};
