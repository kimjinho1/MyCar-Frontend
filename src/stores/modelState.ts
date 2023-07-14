import { ModelFilters, TrimInfo } from "@/types/model";
import { atom } from "recoil";

export type ModelInfo = {
  code: string;
  fullName: string;
  carName: string;
  trimName: string;
  price: number;
  imagePath: string;
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
export const driveCodeState = atom<string>({
  key: "driveCodeState",
  default: "",
});

/** 트림들 정보 */
export const trimInfosState = atom<TrimInfo[]>({
  key: "trimInfosState",
  default: [],
});

/** 선택된 모델 정보 */
export const modelInfoState = atom<ModelInfo>({
  key: "modelInfoState",
  default: {
    code: "",
    fullName: "",
    carName: "",
    trimName: "",
    price: 0,
    imagePath: "",
  },
});
