import { EstimationInfo } from "@/types/estimation";
import { apiInstance } from "./instance";

export const saveEstimation = async (
  estimationInfo: EstimationInfo
): Promise<string> => {
  const data = await apiInstance.post<string>(`/estimation`, estimationInfo);
  return data.data;
};

export const getEstimation = async (
  estimationUrl: string
): Promise<EstimationInfo> => {
  const data = await apiInstance.get<EstimationInfo>(
    `/estimation?estimationUrl=${estimationUrl}`
  );
  return data.data;
};
