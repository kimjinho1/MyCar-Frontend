import { SelectedColor } from "@/stores/colorState";

export type ModelInfo = {
  code: string;
  fullName: string;
  carName: string;
  price: number;
  imagePath: string;
};

export type OptionInfo = {
  code: string;
  name: string;
  price: number;
  imagePath: string;
  typeName: string;
};

export type EstimationInfo = {
  modelInfo: ModelInfo;
  intColor: SelectedColor;
  extColor: SelectedColor;
  options: OptionInfo[];
};

export const defaultModelInfo = {
  code: "",
  fullName: "",
  carName: "",
  price: 0,
  imagePath: "",
};

export const defaultColor = {
  code: "",
  name: "",
  imagePath: "",
};
