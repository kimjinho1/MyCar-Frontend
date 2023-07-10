import { apiInstance } from "@/apis/instance";

type CarInfo = {
  carId: number;
  carCode: string;
  carName: string;
  carImagePath: string;
  carTypeId: string;
};

export const getCarInfo = async (carCode: string): Promise<CarInfo> => {
  return await apiInstance.get<CarInfo>(`/model/carInfo/${carCode}`);
};
