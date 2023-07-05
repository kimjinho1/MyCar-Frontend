import { apiRouterPath } from "@/apis/constants/apiRouterPath";
import { apiInstance } from "@/apis/instance";

export type ExtColorInfo = {
  extColorId: number;
  extColorCode: string;
  extColorName: string;
  extColorImagePath: string;
  carId: number;
  isSelectable: boolean;
};

export const getExtColorInfos = async (
  modelCode: string,
  intColorCode: string
): Promise<ExtColorInfo[]> => {
  return await apiInstance.get<ExtColorInfo[]>(
    apiRouterPath.getExtColorInfos(modelCode, intColorCode)
  );
};
