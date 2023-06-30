import { atom } from "recoil";

export type SelectedModelInfo = {
  code: string;
  fullName: string;
  name: string;
  price: number;
};

const defaultSelectedModelInfo: SelectedModelInfo = {
  code: "",
  fullName: "",
  name: "",
  price: 0,
};

export const selectedModelInfoState = atom<SelectedModelInfo>({
  key: "selectedModelInfo",
  default: defaultSelectedModelInfo,
});
