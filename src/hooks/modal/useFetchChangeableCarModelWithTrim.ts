import * as React from "react";
import { getChangeableCarModelsWithTrim } from "@/services/color";
import {
  SelectedColor,
  newExtColorState,
  newIntColorState,
} from "@/stores/colorState";
import { ChangeableCarModelsWithTrim } from "@/types/color";
import { useSetRecoilState } from "recoil";

export const useFetchChangeableCarModelWithTrim = () => {
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
      });
      setNewExtColor({
        code: extColor.code,
        name: extColor.name,
      });
      setIsOpenChangeTrimModal(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return fetchChangeableCarModelWithTrim;
};
