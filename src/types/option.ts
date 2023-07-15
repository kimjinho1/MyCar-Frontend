export enum OPTION_TYPE {
  DETAIL = "detail",
  HGA = "hga",
  PERFORMANCE = "performance",
}

export type OptionInfo = {
  optionId: number;
  optionCode: string;
  optionName: string;
  optionPrice: number;
  optionImagePath: string;
  optionTypeName: string;
  isSelectable: boolean;
};
