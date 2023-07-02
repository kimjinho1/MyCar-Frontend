import { ModelFilters } from "@/apis/api";
import { atom } from "recoil";

export type ModelInfo = {
  code: string;
  fullName: string;
  name: string;
  price: number;
};

/** 모델 필터들 정보 */
export const modelFiltersState = atom<ModelFilters>({
  key: "modelFiltersState",
  default: {
    engines: [],
    missions: [],
    drives: [],
  },
});

/** 선택된 엔진 코드 */
export const engineCodeState = atom<string>({
  key: "engineCodeState",
  default: "",
});

/** 선택된 변속기 코드 */
export const missionCodeState = atom<string>({
  key: "missionCodeState",
  default: "",
});

/** 선택된 구동방식 코드 */
export const driveCodeState = atom<string | null>({
  key: "driveCodeState",
  default: null,
});

/** 선택된 모델 정보 */
export const modelInfoState = atom<ModelInfo>({
  key: "modelInfoState",
  default: {
    code: "",
    fullName: "",
    name: "",
    price: 0,
  },
});
