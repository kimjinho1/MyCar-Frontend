export type GetTrimInfosParam = {
  carCode: string;
  engineCode: string;
  missionCode: string;
  driveCode: string;
};

class ApiRouterPath {
  public ROOT = "/";

  public CAR_INFO = "/model/carInfo";
  public CAR_INFOS = "/model/carInfos";
  public MODEL_INFO = "/model/modelInfo";
  public MODEL_FILTERS = "/model/filters";
  public MODEL_TRIMS = "/model/trims";

  public INT_COLOR = "/color/int-color";
  public CHANGE_INT_COLOR = "/color/change-int-color";

  public getCarInfoPath(carCode: string): string {
    return `${this.CAR_INFO}/${carCode}`;
  }

  public getModelInfoPath(modelCode: string): string {
    return `${this.MODEL_INFO}/${modelCode}`;
  }

  public getModelFiltersPath(carCode: string): string {
    return `${this.MODEL_FILTERS}/${carCode}`;
  }

  public getTrimsPath(modelFilters: GetTrimInfosParam): string {
    const { carCode, engineCode, missionCode, driveCode } = modelFilters;
    return `${this.MODEL_TRIMS}?carCode=${carCode}&engineCode=${engineCode}&missionCode=${missionCode}&driveCode=${driveCode}`;
  }

  public getIntColorInfos(modelCode: string): string {
    return `${this.INT_COLOR}?modelCode=${modelCode}`;
  }

  public getChangeableCarModelsWithTrim(
    modelCode: string,
    intColorCode: string,
    extColorCode: string
  ): string {
    return `${this.CHANGE_INT_COLOR}?modelCode=${modelCode}&intColorCode=${intColorCode}&extColorCode=${extColorCode}`;
  }
}

export const apiRouterPath = new ApiRouterPath();
