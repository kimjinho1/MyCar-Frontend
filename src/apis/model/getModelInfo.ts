import { apiInstance } from "@/apis/instance";

export type ModelInfo = {
  modelId: number;
  modelCode: string;
  modelName: string;
  modelPrice: number;
  modelImagePath: string;
  carCode: string;
  carName: string;
  trimCode: string;
  trimName: string;
};

export const getModelInfo = async (modelCode: string): Promise<ModelInfo> => {
  return await apiInstance.get<ModelInfo>(`/model/modelInfo/${modelCode}`);
};
