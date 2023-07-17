export enum OPTION_TYPE {
  DETAIL = "detail",
  HGA = "hga",
  PERFORMANCE = "performance",
}

export type OptionMap = Map<string, OptionInfo>;

export type OptionInfo = {
  optionId: number;
  optionCode: string;
  optionName: string;
  optionPrice: number;
  optionImagePath: string;
  optionTypeName: string;
  isSelectable: boolean;
  isDeselectable?: boolean;
};

export type ChangeOptions = {
  add: OptionInfo[];
  remove: OptionInfo[];
};

export type ChangedOptionInfo = {
  optionCode: string;
  newOptions: OptionMap;
  newTuixs: OptionMap;
} & ChangeOptions;
