import { IntColorInfo } from "@/apis";
import { ExtColorInfo } from "@/apis/color/getExtColorInfos";
import { atom, selector } from "recoil";

export type SelectedColor = {
  code: string;
  name: string;
};

/** 내장색상들 정보 */
export const intColorInfosState = atom<IntColorInfo[]>({
  key: "intColorInfosState",
  default: [],
});

/** 외장색상들 정보 */
export const extColorInfosState = atom<ExtColorInfo[]>({
  key: "extColorInfosState",
  default: [],
});

/** 선택된 내장색상 코드 */
export const selectedIntColorState = atom<SelectedColor>({
  key: "selectedIntColorState",
  default: { code: "", name: "" },
});

/** 선택된 외장색상 코드 */
export const selectedExtColorState = atom<SelectedColor>({
  key: "selectedExtColorState",
  default: { code: "", name: "" },
});

/** 선택하고 싶은 내장색상 코드 */
export const newIntColorState = atom<SelectedColor>({
  key: "newIntColorState",
  default: { code: "", name: "" },
});

/** 차량 외부 이미지 번호(1 ~ 60) */
export const carExtPreviewNumState = atom<number>({
  key: "carExtPreviewNumState",
  default: 1,
});

/** GET: 차량 외부 이미지 경로 */
// export const carExtPrivewPathSelector = selector({
//   key: "carExtPrivewPathSelector",
//   get: ({ get }) => {
//     const carList = get(carListState);
//     return carList.map((carInfo) => {
//       return {
//         carTypeCode: carInfo.carTypeCode,
//         carTypeName: carInfo.carTypeName,
//       };
//     });
//   },
// });
