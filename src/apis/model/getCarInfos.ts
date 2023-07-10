import { apiInstance } from "@/apis/instance";

type CarInfo = {
  carCode: string;
  carName: string;
  carImagePath: string;
  carLowPrice: number;
};

export type CarTypeWithCarInfos = {
  carTypeCode: string;
  carTypeName: string;
  carInfos: CarInfo[];
};

export const getCarInfos = async (): Promise<CarTypeWithCarInfos[]> => {
  return await apiInstance.get<CarTypeWithCarInfos[]>("/model/carInfos");
};
