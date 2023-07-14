export type ChangeableCarModelsWithTrim = {
  modelCode: string;
  modelPrice: number;
  modelImagePath: string;
  trimName: string;
};

export type ExtColorInfo = {
  extColorId: number;
  extColorCode: string;
  extColorName: string;
  extColorImagePath: string;
  carId: number;
  isSelectable: boolean;
};

export type IntColorInfo = {
  intColorId: number;
  intColorCode: string;
  intColorName: string;
  intColorImagePath: string;
  carId: number;
  isSelectable: boolean;
};
