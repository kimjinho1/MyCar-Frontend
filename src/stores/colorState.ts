import { ExtColorInfo, IntColorInfo } from "@/types/color";
import { atom } from "recoil";

export type SelectedColor = {
  code: string;
  name: string;
  imagePath: string;
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
  default: { code: "", name: "", imagePath: "" },
});

/** 선택된 외장색상 코드 */
export const selectedExtColorState = atom<SelectedColor>({
  key: "selectedExtColorState",
  default: { code: "", name: "", imagePath: "" },
});

/** 선택하고 싶은 내장색상 코드 */
export const newIntColorState = atom<SelectedColor>({
  key: "newIntColorState",
  default: { code: "", name: "", imagePath: "" },
});

/** 선택하고 싶은 내장색상 코드 */
export const newExtColorState = atom<SelectedColor>({
  key: "newExtColorState",
  default: { code: "", name: "", imagePath: "" },
});
