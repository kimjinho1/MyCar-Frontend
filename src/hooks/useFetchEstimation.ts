import { useRecoilValue, useSetRecoilState } from "recoil";
import { modelInfoState } from "@/stores/modelState";
import {
  selectedExtColorState,
  selectedIntColorState,
} from "@/stores/colorState";
import { selectedOptionState } from "@/stores/optionState";
import { setErrorModalInfoState } from "@/stores/modalState";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/Router";
import { saveEstimation } from "@/services/estimation";

export const useFetchEstimation = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);
  const navigate = useNavigate();

  const modelInfo = useRecoilValue(modelInfoState);
  const intColor = useRecoilValue(selectedIntColorState);
  const extColor = useRecoilValue(selectedExtColorState);
  const options = useRecoilValue(selectedOptionState);

  const fetchEstimation = async () => {
    try {
      const { trimName, ...filterdModelInfo } = modelInfo;
      const filterdOptions = options.map((option) => {
        const { optionId, isSelectable, isDeselectable, ...filterdOption } =
          option;
        return {
          code: filterdOption.optionCode,
          name: filterdOption.optionName,
          price: filterdOption.optionPrice,
          imagePath: filterdOption.optionImagePath,
          typeName: filterdOption.optionTypeName,
        };
      });
      const estimationInfo = {
        modelInfo: filterdModelInfo,
        intColor,
        extColor,
        options: filterdOptions,
      };
      const estimationUrl = await saveEstimation(estimationInfo);
      navigate(ROUTE_PATH.ESTIMATION(estimationUrl));
    } catch (error: any) {
      if (Array.isArray(error.response.data.message)) {
        setErrorModalInfo({
          messages: error.response.data.message[0],
          isRedirect: true,
        });
      }
      setErrorModalInfo({
        messages: error.response.data.message,
        isRedirect: true,
      });
    }
  };
  return fetchEstimation;
};
