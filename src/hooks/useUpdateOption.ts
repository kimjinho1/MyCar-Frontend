import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  getAddPossibleOptions,
  getDeleteOptions,
  getDisableOptions,
} from "@/services/option";
import {
  optionCodesState,
  optionsState,
  changedOptionsState,
  selectOptionState,
  tuixsState,
} from "@/stores/optionState";
import { OPTION_TYPE, OptionMap, OptionInfo } from "@/types/option";

export const useUpdateOption = () => {
  const { modelCode } = useParams();
  const [options, setOptions] = useRecoilState(optionsState);
  const optionCodes = useRecoilValue(optionCodesState);
  const [tuixs, setTuixs] = useRecoilState(tuixsState);
  const setSelectOption = useSetRecoilState(selectOptionState);

  const [changedOptions, setChangedOptions] =
    useRecoilState(changedOptionsState);

  const updateOption = async (optionCode: string, isPressed: boolean) => {
    if (modelCode !== undefined) {
      try {
        setSelectOption(optionCode);
        const newOptions = new Map(options);
        const newTuixs = new Map(tuixs);

        const addOption = await getAddPossibleOptions(modelCode, optionCode);
        const removedAddOption = updateAddOption(
          newOptions,
          newTuixs,
          addOption,
          isPressed
        );

        const disableOption = await getDisableOptions(modelCode, optionCode);
        const removedUpdateOption = updateDisableOption(
          newOptions,
          newTuixs,
          disableOption,
          isPressed
        );

        const deleteOption = await getDeleteOptions(modelCode, optionCode);
        const removedDeleteOption = updateDeleteOption(
          newTuixs,
          deleteOption,
          isPressed
        );

        setOptions(newOptions);
        setTuixs(newTuixs);

        const removedOptions = [
          ...removedAddOption,
          ...removedUpdateOption,
          ...removedDeleteOption,
        ];
        if (removedOptions.length > 0) {
          setChangedOptions({
            add: [],
            remove: removedOptions,
          });
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return updateOption;
};

/**
 * UTILS
 */
const updateOptionMap = (
  optionMap: OptionMap,
  option: OptionInfo,
  isSelectable: boolean
) => {
  optionMap.set(option.optionCode, {
    ...option,
    isSelectable,
  });
};

const updateAddOption = (
  newOptions: OptionMap,
  newTuixs: OptionMap,
  addOption: OptionInfo[],
  isPressed: boolean
): OptionInfo[] => {
  const removedOptions: OptionInfo[] = [];

  addOption.map((option) => {
    if (isPressed) {
      if (option.optionTypeName === OPTION_TYPE.DETAIL) {
        return updateOptionMap(newOptions, option, true);
      }
      newTuixs.set(option.optionCode, option);
      return;
    }

    removedOptions.push(option);
    if (option.optionTypeName === OPTION_TYPE.DETAIL) {
      return updateOptionMap(newOptions, option, false);
    }
    newTuixs.delete(option.optionCode);
  });
  return removedOptions;
};

const updateOptions = (
  newOptions: OptionMap,
  addOption: OptionInfo[],
  isPressed: boolean,
  state: boolean
) => {
  addOption.map((option) => {
    newOptions.set(option.optionCode, {
      ...option,
      isSelectable: isPressed ? state : !state,
    });
  });
};

const updateTuixs = (
  newTuixs: OptionMap,
  addOption: OptionInfo[],
  isPressed: boolean
) => {
  addOption.map((option) => {
    isPressed
      ? newTuixs.set(option.optionCode, option)
      : newTuixs.delete(option.optionCode);
  });
};

const updateDisableOption = (
  newOptions: OptionMap,
  newTuixs: OptionMap,
  disableOption: OptionInfo[],
  isPressed: boolean
): OptionInfo[] => {
  const removedOptions: OptionInfo[] = [];

  disableOption.map((option) => {
    if (isPressed) {
      removedOptions.push(option);
      if (option.optionTypeName === OPTION_TYPE.DETAIL) {
        return updateOptionMap(newOptions, option, false);
      }
      return updateOptionMap(newTuixs, option, false);
    }

    if (option.optionTypeName === OPTION_TYPE.DETAIL) {
      return updateOptionMap(newOptions, option, true);
    }
    updateOptionMap(newTuixs, option, true);
  });
  return removedOptions;
};

const updateDeleteOption = (
  newTuixs: OptionMap,
  deleteOption: OptionInfo[],
  isPressed: boolean
): OptionInfo[] => {
  const removedOptions: OptionInfo[] = [];

  deleteOption.map((option) => {
    if (isPressed) {
      removedOptions.push(option);
      newTuixs.delete(option.optionCode);
      return;
    }
    newTuixs.set(option.optionCode, option);
  });
  return removedOptions;
};
