import { apiRouterPath } from "@/apis/constants/apiRouterPath";
import { apiInstance } from "@/apis/instance";

export type ModelInfo = {
  modelId: number;
  modelCode: string;
  modelName: string;
  modelPrice: number;
  carCode: string;
  carName: string;
  trimCode: string;
  trimName: string;
};

export const getModelInfo = async (modelCode: string): Promise<ModelInfo> => {
  return await apiInstance.get<ModelInfo>(
    apiRouterPath.getModelInfoPath(modelCode)
  );
};
