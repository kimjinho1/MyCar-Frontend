import {
  ChangeableCarModelsWithTrim,
  ExtColorInfo,
  IntColorInfo,
} from "@/types/color";
import { apiInstance } from "./instance";

export const getChangeableCarModelsWithTrim = async (
  modelCode: string,
  intColorCode: string,
  extColorCode: string
): Promise<ChangeableCarModelsWithTrim> => {
  return await apiInstance.get<ChangeableCarModelsWithTrim>(
    `/color/change-int-color?modelCode=${modelCode}&intColorCode=${intColorCode}&extColorCode=${extColorCode}`
  );
};

export const getExtColorInfos = async (
  modelCode: string,
  intColorCode: string
): Promise<ExtColorInfo[]> => {
  return await apiInstance.get<ExtColorInfo[]>(
    `/color/ext-color?modelCode=${modelCode}&intColorCode=${intColorCode}`
  );
};

export const getIntColorInfos = async (
  modelCode: string,
  extColorCode: string
): Promise<IntColorInfo[]> => {
  return await apiInstance.get<IntColorInfo[]>(
    `/color/int-color?modelCode=${modelCode}&extColorCode=${
      extColorCode !== undefined ? extColorCode : ""
    }`
  );
};
