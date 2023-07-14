import * as React from "react";
import { getChangeableCarModelsWithTrim } from "@/services/color";
import { newIntColorState } from "@/stores/colorState";
import { ChangeableCarModelsWithTrim } from "@/types/color";
import { useSetRecoilState } from "recoil";

export const useFetchChangeableCarModelWithTrim = () => {
  const setNewIntColor = useSetRecoilState(newIntColorState);

  const fetchChangeableCarModelWithTrim = async (
    modelCode: string,
    intColorCode: string,
    intColorName: string,
    selectedExtColorCode: string,
    setIsOpenChangeTrimModal: React.Dispatch<React.SetStateAction<boolean>>,
    setChangeableModelInfo: React.Dispatch<
      React.SetStateAction<ChangeableCarModelsWithTrim | undefined>
    >
  ) => {
    try {
      const data = await getChangeableCarModelsWithTrim(
        modelCode,
        intColorCode,
        selectedExtColorCode
      );
      setChangeableModelInfo(data);
      setNewIntColor({
        code: intColorCode,
        name: intColorName,
      });
      setIsOpenChangeTrimModal(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return fetchChangeableCarModelWithTrim;
};
