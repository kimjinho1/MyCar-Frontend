import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  changedOptionsState,
  optionCodesState,
  optionsState,
  tuixsState,
} from "@/stores/optionState";
import { getChangeOptions } from "@/services/option";
import { OPTION_TYPE, OptionInfo } from "@/types/option";
import { setErrorModalInfoState } from "@/stores/modalState";

export const useFetchChangeOption = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const options = useRecoilValue(optionsState);
  const tuixs = useRecoilValue(tuixsState);
  const optionCodes = useRecoilValue(optionCodesState);

  const setChangedOptions = useSetRecoilState(changedOptionsState);

  const fetchChangeOption = async (
    modelCode: string,
    option: OptionInfo,
    setIsOpenChangeOptionModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    console.log("changeOption");
    try {
      const newOptions = new Map(options);
      const newTuixs = new Map(tuixs);

      const changeOptions = await getChangeOptions(
        modelCode,
        option.optionCode,
        Array.from(optionCodes).join(",")
      );
      if (changeOptions.add.length < 1 && changeOptions.remove.length < 1) {
        return;
      }

      option.optionTypeName === OPTION_TYPE.DETAIL
        ? newOptions.set(option.optionCode, {
            ...option,
            isSelectable: true,
          })
        : newTuixs.set(option.optionCode, {
            ...option,
            isSelectable: true,
          });

      changeOptions.remove.map((option) => {
        option.optionTypeName === OPTION_TYPE.DETAIL
          ? newOptions.set(option.optionCode, {
              ...option,
              isSelectable: false,
            })
          : newTuixs.set(option.optionCode, {
              ...option,
              isSelectable: false,
            });
      });

      setChangedOptions({
        optionCode: option.optionCode,
        newOptions: newOptions,
        newTuixs: newTuixs,
        add: [...changeOptions.add, option],
        remove: [...changeOptions.remove],
      });

      setIsOpenChangeOptionModal(true);
    } catch (error: any) {
      setErrorModalInfo({
        messages: error.response.data.message,
        isRedirect: true,
      });
    }
  };

  return fetchChangeOption;
};
