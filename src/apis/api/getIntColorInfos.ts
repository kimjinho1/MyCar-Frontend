import { apiRouterPath } from "@/apis/constants/apiRouterPath";
import { apiInstance } from "@/apis/instance";

export type IntColorInfo = {
  intColorId: number;
  intColorCode: string;
  intColorName: string;
  intColorImagePath: string;
  carId: number;
  isSelectable: boolean;
};

export const getIntColorInfos = async (
  modelCode: string
): Promise<IntColorInfo[]> => {
  return await apiInstance.get<IntColorInfo[]>(
    apiRouterPath.getIntColorInfos(modelCode)
  );
};
