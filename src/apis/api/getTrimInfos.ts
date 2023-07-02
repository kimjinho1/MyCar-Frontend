import { apiInstance } from "@/apis/instance";
import {
  apiRouterPath,
  GetTrimInfosParam,
} from "@/apis/constants/apiRouterPath";

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
  return await apiInstance.get<TrimInfo[]>(
    apiRouterPath.getTrimsPath(modelFilters)
  );
};
