import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { getAutoChoiceOptions, getOptions } from "@/services/option";
import {
  newOptionCodesState,
  optionCodesState,
  optionsState,
} from "@/stores/optionState";
import { OPTION_TYPE, OptionInfo, OptionMap } from "@/types/option";
import { setErrorModalInfoState } from "@/stores/modalState";
import { useUpdateTuix } from "./useUpdateTuix";

export const useFetchOption = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const setOptions = useSetRecoilState(optionsState);
  const [optionCodes, setOptionCodes] = useRecoilState(optionCodesState);
  const savedOptionCodes = useRecoilValue(newOptionCodesState);
  const resetNewOptionCodes = useResetRecoilState(newOptionCodesState);

  const updateTuix = useUpdateTuix();

  const fetchOption = async (modelCode: string, intColorCode: string) => {
    try {
      const newOptions = new Map<string, OptionInfo>();
      const newTuixs = new Map<string, OptionInfo>();
      const newOptionCodes =
        savedOptionCodes && savedOptionCodes.size > 0
          ? new Set<string>(savedOptionCodes)
          : new Set<string>(optionCodes);

      /** 옵션 정보 */
      const options = await getOptions(modelCode, intColorCode);
      InitOptions(newOptions, newTuixs, options);

      /** 내장색상 때문에 자동으로 선택되어야 하는 옵션 정보 */
      const autoChoiceOptions = await getAutoChoiceOptions(
        modelCode,
        intColorCode
      );
      choiceOptions(newOptions, newOptionCodes, autoChoiceOptions);

      Array.from(newOptions.values()).map((option) => {
        if (!option.isSelectable && newOptionCodes.has(option.optionCode)) {
          newOptionCodes.delete(option.optionCode);
        }
      });

      setOptions(newOptions);
      updateTuix(modelCode, newOptions, newTuixs, newOptionCodes);
      setOptionCodes(newOptionCodes);
      resetNewOptionCodes();
    } catch (error: any) {
      setErrorModalInfo({
        messages: error.response.data.message,
        isRedirect: true,
      });
    }
  };

  return fetchOption;
};

/**
 * UTILS
 */
const InitOptions = (
  newOptions: OptionMap,
  newTuixs: OptionMap,
  options: OptionInfo[]
) => {
  options.map((option) => {
    if (option.optionTypeName === OPTION_TYPE.DETAIL) {
      newOptions.set(option.optionCode, option);
      return;
    }
    newTuixs.set(option.optionCode, option);
  });
};

const choiceOptions = (
  newOptions: OptionMap,
  newOptionCodes: Set<string>,
  autoChoiceOptions: OptionInfo[]
) => {
  autoChoiceOptions.map((option) => {
    newOptions.set(option.optionCode, {
      ...option,
      isSelectable: true,
      isDeselectable: true,
    });
    newOptionCodes.add(option.optionCode);
  });
};
