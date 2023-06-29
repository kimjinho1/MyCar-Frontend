export interface CarInfo {
  carId: number;
  carCode: string;
  carName: string;
  carImagePath: string;
  carTypeId: string;
}

export interface ModelInfo {
  modelId: number;
  modelCode: string;
  modelName: string;
  modelPrice: number;
  carCode: string;
  carName: string;
  trimCode: string;
  trimName: string;
}
