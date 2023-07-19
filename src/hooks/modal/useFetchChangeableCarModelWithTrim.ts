import * as React from "react";
import { getChangeableCarModelsWithTrim } from "@/services/color";
import {
  SelectedColor,
  newExtColorState,
  newIntColorState,
} from "@/stores/colorState";
import { ChangeableCarModelsWithTrim } from "@/types/color";
import { useSetRecoilState } from "recoil";
import { setErrorModalInfoState } from "@/stores/modalState";

export const useFetchChangeableCarModelWithTrim = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const setNewIntColor = useSetRecoilState(newIntColorState);
  const setNewExtColor = useSetRecoilState(newExtColorState);

  const fetchChangeableCarModelWithTrim = async (
    modelCode: string,
    intColor: SelectedColor,
    extColor: SelectedColor,
    setIsOpenChangeTrimModal: React.Dispatch<React.SetStateAction<boolean>>,
    setChangeableModelInfo: React.Dispatch<
      React.SetStateAction<ChangeableCarModelsWithTrim | undefined>
    >
  ) => {
    try {
      const data = await getChangeableCarModelsWithTrim(
        modelCode,
        intColor.code,
        extColor.code
      );
      setChangeableModelInfo(data);
      setNewIntColor({
        code: intColor.code,
        name: intColor.name,
        imagePath: intColor.imagePath,
      });
      setNewExtColor({
        code: extColor.code,
        name: extColor.name,
        imagePath: extColor.imagePath,
      });
      setIsOpenChangeTrimModal(true);
    } catch (error: any) {
      setErrorModalInfo({
        messages: error.response.data.message,
        isRedirect: false,
      });
    }
  };

  return fetchChangeableCarModelWithTrim;
};
