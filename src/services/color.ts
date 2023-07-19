import {
  ChangeableCarModelsWithTrim,
  ExtColorInfo,
  IntColorInfo,
} from "@/types/color";
import { apiInstance } from "./instance";

export const getChangeableCarModelsWithTrim = async (
  modelCode: string,
  intColorCode: string,
  extColorCode: string,
  beforeCode: string
): Promise<ChangeableCarModelsWithTrim> => {
  const data = await apiInstance.get<ChangeableCarModelsWithTrim>(
    `/color/change-int-color?modelCode=${modelCode}&intColorCode=${intColorCode}&extColorCode=${extColorCode}&beforeCode=${beforeCode}`
  );
  return data.data;
};

export const getExtColorInfos = async (
  modelCode: string,
  intColorCode: string
): Promise<ExtColorInfo[]> => {
  const data = await apiInstance.get<ExtColorInfo[]>(
    `/color/ext-color?modelCode=${modelCode}&intColorCode=${intColorCode}`
  );
  return data.data;
};

export const getIntColorInfos = async (
  modelCode: string,
  extColorCode?: string
): Promise<IntColorInfo[]> => {
  const data = await apiInstance.get<IntColorInfo[]>(
    `/color/int-color?modelCode=${modelCode}&extColorCode=${
      extColorCode !== undefined ? extColorCode : ""
    }`
  );
  return data.data;
};
