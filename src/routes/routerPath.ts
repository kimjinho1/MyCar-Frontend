class RouterPath {
  public ROOT = "/";
  public SELECT_MODEL = "/model/:carCode";
  public MAKING_MODEL = "/model/making/:modelCode";
  public ESTIMATION = "/estimation";

  public getSelectModel(carCode: string): string {
    return `/model/${carCode}`;
  }

  public getMakingModel(modelCode: string): string {
    return `/model/making/${modelCode}`;
  }
}

export const routerPath = new RouterPath();
