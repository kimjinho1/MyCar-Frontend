class ApiRouterPath {
  public ROOT = "/";
  public CAR_INFO = "/model/carInfo";
  public CAR_INFOS = "/model/carInfos";
  public MODEL_INFO = "/model/modelInfo";

  public getCarInfoPath(carCode: string): string {
    return `${this.CAR_INFO}/${carCode}`;
  }

  public getModelInfoPath(modelCode: string): string {
    return `${this.MODEL_INFO}/${modelCode}`;
  }
}

export const apiRouterPath = new ApiRouterPath();
