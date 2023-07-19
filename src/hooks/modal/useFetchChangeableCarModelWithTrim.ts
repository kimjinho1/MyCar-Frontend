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
import { newOptionCodesState } from "@/stores/optionState";

export const useFetchChangeableCarModelWithTrim = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const setNewIntColor = useSetRecoilState(newIntColorState);
  const setNewExtColor = useSetRecoilState(newExtColorState);
  const setNewOptionCodes = useSetRecoilState(newOptionCodesState);

  const fetchChangeableCarModelWithTrim = async (
    modelCode: string,
    intColor: SelectedColor,
    extColor: SelectedColor,
    optionCodes: Set<string>,
    setIsOpenChangeTrimModal: React.Dispatch<React.SetStateAction<boolean>>,
    setChangeableModelInfo: React.Dispatch<
      React.SetStateAction<ChangeableCarModelsWithTrim | undefined>
    >
  ) => {
    try {
      const newOptionCodes = new Set(optionCodes);
      const beforeCode = Array.from(optionCodes).join(",");
      const data = await getChangeableCarModelsWithTrim(
        modelCode,
        intColor.code,
        extColor.code,
        beforeCode
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
      data.removeOptionCodes.map((removeOptionCode) => {
        newOptionCodes.delete(removeOptionCode);
      });
      setNewOptionCodes(newOptionCodes);
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
