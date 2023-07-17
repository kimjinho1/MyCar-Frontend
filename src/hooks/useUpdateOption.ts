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
import {
  changeOptionModalState,
  setErrorModalInfoState,
} from "@/stores/modalState";

export const useUpdateOption = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const { modelCode } = useParams();
  const [options, setOptions] = useRecoilState(optionsState);
  const optionCodes = useRecoilValue(optionCodesState);
  const [tuixs, setTuixs] = useRecoilState(tuixsState);
  const setSelectOption = useSetRecoilState(selectOptionState);

  const setChangedOptions = useSetRecoilState(changedOptionsState);
  const setChangeOptionModal = useSetRecoilState(changeOptionModalState);

  const updateOption = async (optionCode: string, isPressed: boolean) => {
    if (modelCode !== undefined) {
      try {
        console.log("useUpdateOpton");
        const newOptions = new Map(options);
        const newTuixs = new Map(tuixs);

        const addOption = await getAddPossibleOptions(modelCode, optionCode);
        const removedAddOption = updateAddOption(
          newOptions,
          newTuixs,
          addOption,
          optionCodes,
          isPressed
        );

        const disableOption = await getDisableOptions(modelCode, optionCode);
        const removedUpdateOption = updateDisableOption(
          newOptions,
          newTuixs,
          disableOption,
          optionCodes,
          isPressed
        );

        const deleteOption = await getDeleteOptions(modelCode, optionCode);
        const removedDeleteOption = updateDeleteOption(
          newTuixs,
          deleteOption,
          optionCodes,
          isPressed
        );

        const removedOptions = [
          ...removedAddOption,
          ...removedUpdateOption,
          ...removedDeleteOption,
        ];
        if (removedOptions.length > 0) {
          setChangedOptions({
            optionCode: optionCode,
            newOptions: newOptions,
            newTuixs: newTuixs,
            add: [],
            remove: removedOptions,
          });
          setChangeOptionModal(true);
          return;
        }

        setOptions(newOptions);
        setTuixs(newTuixs);
        setSelectOption(optionCode);
      } catch (error) {
        setErrorModalInfo({
          messages: error.response.data.message,
          isRedirect: true,
        });
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
  optionCodes: Set<string>,
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

    if (optionCodes.has(option.optionCode)) {
      removedOptions.push(option);
    }
    if (option.optionTypeName === OPTION_TYPE.DETAIL) {
      return updateOptionMap(newOptions, option, false);
    }
    newTuixs.delete(option.optionCode);
  });
  return removedOptions;
};

// const updateOptions = (
//   newOptions: OptionMap,
//   addOption: OptionInfo[],
//   isPressed: boolean,
//   state: boolean
// ) => {
//   addOption.map((option) => {
//     newOptions.set(option.optionCode, {
//       ...option,
//       isSelectable: isPressed ? state : !state,
//     });
//   });
// };

// const updateTuixs = (
//   newTuixs: OptionMap,
//   addOption: OptionInfo[],
//   isPressed: boolean
// ) => {
//   addOption.map((option) => {
//     isPressed
//       ? newTuixs.set(option.optionCode, option)
//       : newTuixs.delete(option.optionCode);
//   });
// };

const updateDisableOption = (
  newOptions: OptionMap,
  newTuixs: OptionMap,
  disableOption: OptionInfo[],
  optionCodes: Set<string>,
  isPressed: boolean
): OptionInfo[] => {
  const removedOptions: OptionInfo[] = [];

  disableOption.map((option) => {
    if (isPressed) {
      if (optionCodes.has(option.optionCode)) {
        removedOptions.push(option);
      }
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
  optionCodes: Set<string>,
  isPressed: boolean
): OptionInfo[] => {
  const removedOptions: OptionInfo[] = [];

  deleteOption.map((option) => {
    if (isPressed) {
      if (optionCodes.has(option.optionCode)) {
        removedOptions.push(option);
      }
      newTuixs.delete(option.optionCode);
      return;
    }
    newTuixs.set(option.optionCode, option);
  });
  return removedOptions;
};
