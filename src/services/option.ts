import { OptionInfo } from "@/types/option";
import { apiInstance } from "./instance";

export const getOptions = async (modelCode: string): Promise<OptionInfo[]> => {
  return await apiInstance.get<OptionInfo[]>(`/option/?modelCode=${modelCode}`);
};
