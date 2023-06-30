class RouterPath {
  public ROOT = "/";
  public SELECT_MODEL = "/model/:carCode";
  public MAKING_MODEL = "/model/making/:modelCode";
  public ESTIMATION = "/estimation";

  public getSelectModelPath(carCode: string): string {
    return `/model/${carCode}`;
  }

  public getMakingModelPathPath(modelCode: string): string {
    return `/model/making/${modelCode}`;
  }
}

export const routerPath = new RouterPath();
