import { apiInstance } from "@/apis/instance";
import { apiRouterPath } from "@/apis/constants/apiRouterPath";

type CarInfo = {
  carId: number;
  carCode: string;
  carName: string;
  carImagePath: string;
  carTypeId: string;
};

export const getCarInfo = async (carCode: string): Promise<CarInfo> => {
  return await apiInstance.get<CarInfo>(apiRouterPath.getCarInfoPath(carCode));
};
