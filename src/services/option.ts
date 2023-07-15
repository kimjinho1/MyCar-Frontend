import { OptionInfo } from "@/types/option";
import { apiInstance } from "./instance";

export const getOptions = async (modelCode: string): Promise<OptionInfo[]> => {
  return await apiInstance.get<OptionInfo[]>(`/option/?modelCode=${modelCode}`);
};

export const getAddPossibleOptions = async (
  modelCode: string,
  optionCode: string
): Promise<OptionInfo[]> => {
  return await apiInstance.get<OptionInfo[]>(
    `/option/add-possible?modelCode=${modelCode}&optionCode=${optionCode}`
  );
};

export const getDisableOptions = async (
  modelCode: string,
  optionCode: string
): Promise<OptionInfo[]> => {
  return await apiInstance.get<OptionInfo[]>(
    `/option/disable?modelCode=${modelCode}&optionCode=${optionCode}`
  );
};
