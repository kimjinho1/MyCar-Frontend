import { atom } from "recoil";

export type SelectedCarInfo = {
  code: string;
  name: string;
};

const defaultSelectedCarInfo: SelectedCarInfo = {
  code: "",
  name: "",
};

export const selectedCarInfoState = atom<SelectedCarInfo>({
  key: "selectedCarInfo",
  default: defaultSelectedCarInfo,
});
