import { atom } from "recoil";

/** 옵션들 정보 */
export const changeOptionModalState = atom<boolean>({
  key: "changeOptionModalState",
  default: false,
});
