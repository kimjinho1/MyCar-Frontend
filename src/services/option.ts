import { ChangeOptions, OptionInfo } from "@/types/option";
import { apiInstance } from "./instance";
import { EstimationInfo } from "@/types/estimation";

export const getOptions = async (
  modelCode: string,
  intColorCode: string
): Promise<OptionInfo[]> => {
  const data = await apiInstance.get<OptionInfo[]>(
    `/option/?modelCode=${modelCode}&intColorCode=${intColorCode}`
  );
  return data.data;
};

export const getAddPossibleOptions = async (
  modelCode: string,
  optionCode: string
): Promise<OptionInfo[]> => {
  const data = await apiInstance.get<OptionInfo[]>(
    `/option/add-possible?modelCode=${modelCode}&optionCode=${optionCode}`
  );
  return data.data;
};

export const getDisableOptions = async (
  modelCode: string,
  optionCode: string
): Promise<OptionInfo[]> => {
  const data = await apiInstance.get<OptionInfo[]>(
    `/option/disable?modelCode=${modelCode}&optionCode=${optionCode}`
  );
  return data.data;
};

export const getDeleteOptions = async (
  modelCode: string,
  optionCode: string
): Promise<OptionInfo[]> => {
  const data = await apiInstance.get<OptionInfo[]>(
    `/option/delete?modelCode=${modelCode}&optionCode=${optionCode}`
  );
  return data.data;
};

export const getAutoChoiceOptions = async (
  modelCode: string,
  intColorCode: string
): Promise<OptionInfo[]> => {
  const data = await apiInstance.get<OptionInfo[]>(
    `/option/auto-choice?modelCode=${modelCode}&intColorCode=${intColorCode}`
  );
  return data.data;
};

export const getChangeOptions = async (
  modelCode: string,
  optionCode: string,
  beforeOptionCode: string
): Promise<ChangeOptions> => {
  const data = await apiInstance.get<ChangeOptions>(
    `/option/change?modelCode=${modelCode}&optionCode=${optionCode}&beforeOptionCode=${beforeOptionCode}`
  );
  return data.data;
};

export const getTuixs = async (
  modelCode: string,
  beforeOptionCode: string,
  beforeTuixCode: string
): Promise<OptionInfo[]> => {
  const data = await apiInstance.get<OptionInfo[]>(
    `/option/tuix?modelCode=${modelCode}&beforeOptionCode=${beforeOptionCode}&beforeTuixCode=${beforeTuixCode}`
  );
  return data.data;
};

export const saveEstimation = async (
  estimationInfo: EstimationInfo
): Promise<string> => {
  const data = await apiInstance.post<string>(
    `/option/estimation`,
    estimationInfo
  );
  return data.data;
};

export const getEstimation = async (
  estimationUrl: string
): Promise<EstimationInfo> => {
  const data = await apiInstance.get<EstimationInfo>(
    `/option/estimation?estimationUrl=${estimationUrl}`
  );
  return data.data;
};
