import { useEffect } from "react";
import { modelInfoState } from "@/stores/modelState";
import { ROUTE_PATH } from "@/Router";
import { getModelInfo } from "@/services/model";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { carInfoState } from "@/stores/carState";

export const useFetchCarAndModel = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const setCarInfo = useSetRecoilState(carInfoState);
  const setModelInfo = useSetRecoilState(modelInfoState);

  useEffect(() => {
    const fetchData = async () => {
      if (modelCode !== undefined) {
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
        } catch (error) {
          alert(error.response.data.message);
          navigate(ROUTE_PATH.ROOT);
        }
      }
    };
    fetchData();
  }, [modelCode]);
};
