import { CarTypeWithCarInfos } from "@/apis/api";
import { atom, selector } from "recoil";

const defaultCarList: CarTypeWithCarInfos[] = [];

export const selectedCarTypeCodeState = atom<string>({
  key: "selectedCarTypeCodeState",
  default: "",
});

export const carInfosState = atom<CarTypeWithCarInfos[]>({
  key: "carListState",
  default: defaultCarList,
});

export const carTypesSelector = selector({
  key: "carTypesSelector",
  get: ({ get }) => {
    const carInfos = get(carInfosState);
    return carInfos.map((carInfo) => {
      return {
        carTypeCode: carInfo.carTypeCode,
        carTypeName: carInfo.carTypeName,
      };
    });
  },
});

export const carInfosSelector = selector({
  key: "carInfosSelector",
  get: ({ get }) => {
    const selectedCarTypeCode = get(selectedCarTypeCodeState);
    const carList = get(carInfosState);
    const carTypeWithCarInfos = carList.filter(
      (list) => list.carTypeCode === selectedCarTypeCode
    );
    if (carTypeWithCarInfos.length === 0) {
      return [];
    }
    return carTypeWithCarInfos[0].carInfos;
  },
});
