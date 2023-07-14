export type SelectedCarInfo = {
  code: string;
  name: string;
};

export type CarInfo = {
  carId: number;
  carCode: string;
  carName: string;
  carImagePath: string;
  carTypeId: string;
};

export type CarType = {
  carTypeCode: string;
  carTypeName: string;
};

export type CarTypeWithCarInfos = CarType & {
  carTypeId: number;
  carInfos: CarInfo[];
};

export type ExtendedCarTypeWithCarInfos = CarTypeWithCarInfos & {
  isSelected: boolean;
};

export type Engine = {
  engineId: number;
  engineCode: string;
  engineName: string;
};

export type Mission = {
  missionId: number;
  missionCode: string;
  missionName: string;
};

export type Drive = {
  driveId: number;
  driveCode: string;
  driveName: string;
};

export type ModelFilters = {
  engines: Engine[];
  missions: Mission[];
  drives: Drive[];
};

export type ModelInfo = {
  modelId: number;
  modelCode: string;
  modelName: string;
  modelPrice: number;
  modelImagePath: string;
  carCode: string;
  carName: string;
  trimCode: string;
  trimName: string;
};

export type GetTrimInfosParam = {
  carCode: string;
  engineCode: string;
  missionCode: string;
  driveCode: string;
};

export type TrimInfo = {
  modelId: number;
  modelCode: string;
  modelImagePath: string;
  modelPrice: number;
  filterSummary: string;
  trimCode: string;
  trimName: string;
};
