import { SelectedCarInfo, CarTypeWithCarInfos, CarType } from "@/types/model";
import { atom, selector } from "recoil";

/** 선택된 차량 정보 */
export const carInfoState = atom<SelectedCarInfo>({
  key: "carInfoState",
  default: {
    code: "",
    name: "",
  },
});

/** 선택된 차량 타입 코드 */
export const carTypeCodeState = atom<string>({
  key: "carTypeCodeState",
  default: "",
});

/** 모든 차량 정보 */
export const carListState = atom<CarTypeWithCarInfos[]>({
  key: "carListState",
  default: [],
});

/** GET: 차량 타입 정보들 */
export const carTypesSelector = selector<CarType[]>({
  key: "carTypesSelector",
  get: ({ get }) => {
    const carList = get(carListState);
    return carList.map((carInfo) => {
      return {
        carTypeCode: carInfo.carTypeCode,
        carTypeName: carInfo.carTypeName,
      };
    });
  },
});

/** GET: 선택한 차량 타입의 차량 정보들 */
export const carListSelector = selector({
  key: "carInfosSelector",
  get: ({ get }) => {
    const selectedCarTypeCode = get(carTypeCodeState);
    const carList = get(carListState);
    const carTypeWithCarInfos = carList.filter(
      (list) => list.carTypeCode === selectedCarTypeCode
    );
    if (carTypeWithCarInfos.length === 0) {
      return [];
    }
    return carTypeWithCarInfos[0].carInfos;
  },
});
