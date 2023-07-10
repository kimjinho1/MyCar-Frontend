import { apiInstance } from "@/apis/instance";

export type ChangeableCarModelsWithTrim = {
  modelCode: string;
  modelPrice: number;
  modelImagePath: string;
  trimName: string;
};

export const getChangeableCarModelsWithTrim = async (
  modelCode: string,
  intColorCode: string,
  extColorCode: string
): Promise<ChangeableCarModelsWithTrim> => {
  return await apiInstance.get<ChangeableCarModelsWithTrim>(
    `/color/change-int-color?modelCode=${modelCode}&intColorCode=${intColorCode}&extColorCode=${extColorCode}`
  );
};
