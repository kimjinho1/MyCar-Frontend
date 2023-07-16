import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  changedOptionsState,
  optionsState,
  tuixsState,
} from "@/stores/optionState";
import { getAddTogetherOptions } from "@/services/option";
import { OptionInfo } from "@/types/option";

export const useFetchAddOption = () => {
  const options = useRecoilValue(optionsState);
  const tuixs = useRecoilValue(tuixsState);

  const setChangedOptions = useSetRecoilState(changedOptionsState);

  const fetchAddOption = async (
    modelCode: string,
    option: OptionInfo,
    setIsOpenAddOptionModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const newOptions = new Map(options);
      const newTuixs = new Map(tuixs);

      const addTogetherOptions = await getAddTogetherOptions(
        modelCode,
        option.optionCode
      );
      if (addTogetherOptions.length < 1) {
        return;
      }

      newOptions.set(option.optionCode, {
        ...option,
        isSelectable: true,
      });
      setChangedOptions({
        optionCode: option.optionCode,
        newOptions: newOptions,
        newTuixs: newTuixs,
        add: [...addTogetherOptions, option],
        remove: [],
      });

      setIsOpenAddOptionModal(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return fetchAddOption;
};
