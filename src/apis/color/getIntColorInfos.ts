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
  modelCode: string,
  extColorCode: string
): Promise<IntColorInfo[]> => {
  return await apiInstance.get<IntColorInfo[]>(
    `/color/int-color?modelCode=${modelCode}&extColorCode=${
      extColorCode !== undefined ? extColorCode : ""
    }`
  );
};
