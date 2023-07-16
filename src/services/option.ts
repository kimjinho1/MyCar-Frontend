import { OptionInfo } from "@/types/option";
import { apiInstance } from "./instance";

export const getOptions = async (
  modelCode: string,
  intColorCode: string
): Promise<OptionInfo[]> => {
  return await apiInstance.get<OptionInfo[]>(
    `/option/?modelCode=${modelCode}&intColorCode=${intColorCode}`
  );
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

export const getDeleteOptions = async (
  modelCode: string,
  optionCode: string
): Promise<OptionInfo[]> => {
  return await apiInstance.get<OptionInfo[]>(
    `/option/delete?modelCode=${modelCode}&optionCode=${optionCode}`
  );
};

export const getAutoChoiceOptions = async (
  modelCode: string,
  intColorCode: string
): Promise<OptionInfo[]> => {
  return await apiInstance.get<OptionInfo[]>(
    `/option/auto-choice?modelCode=${modelCode}&intColorCode=${intColorCode}`
  );
};
