import { apiRouterPath } from "@/apis/constants/apiRouterPath";
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
    apiRouterPath.getChangeableCarModelsWithTrim(
      modelCode,
      intColorCode,
      extColorCode
    )
  );
};
