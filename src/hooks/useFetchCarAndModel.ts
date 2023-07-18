import { modelInfoState } from "@/stores/modelState";
import { getModelInfo } from "@/services/model";
import { useSetRecoilState } from "recoil";
import { carInfoState } from "@/stores/carState";
import { setErrorModalInfoState } from "@/stores/modalState";

export const useFetchCarAndModel = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const setCarInfo = useSetRecoilState(carInfoState);
  const setModelInfo = useSetRecoilState(modelInfoState);

  const fetchCarAndModel = async (modelCode: string) => {
    try {
      /** 모델 정보 */
      const modelData = await getModelInfo(modelCode);
      setCarInfo({
        code: modelData.carCode,
        name: modelData.carName,
      });

      setModelInfo({
        code: modelData.modelCode,
        fullName: modelData.modelName,
        carName: modelData.carName,
        trimName: modelData.trimName,
        price: modelData.modelPrice,
        imagePath: modelData.modelImagePath,
      });
    } catch (error: any) {
      setErrorModalInfo({
        messages: error.response.data.message,
        isRedirect: true,
      });
    }
  };
  return fetchCarAndModel;
};
