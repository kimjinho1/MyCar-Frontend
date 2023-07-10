import { apiInstance } from "@/apis/instance";

export type OptionInfo = {
  optionId: number;
  optionCode: string;
  optionName: string;
  optionPrice: number;
  optionImagePath: string;
  optionTypeName: string;
  isSelectable: boolean;
};

export const getOptions = async (modelCode: string): Promise<OptionInfo[]> => {
  return await apiInstance.get<OptionInfo[]>(`/option/?modelCode=${modelCode}`);
};
