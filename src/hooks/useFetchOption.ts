import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getAutoChoiceOptions, getOptions } from "@/services/option";
import {
  optionCodesState,
  optionsState,
  tuixsState,
} from "@/stores/optionState";
import { ROUTE_PATH } from "@/Router";
import { OPTION_TYPE, OptionInfo, OptionMap } from "@/types/option";
import { selectedIntColorState } from "@/stores/colorState";

export const useFetchOption = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const intColor = useRecoilValue(selectedIntColorState);
  const setOptions = useSetRecoilState(optionsState);
  const setTuixs = useSetRecoilState(tuixsState);
  const [optionCodes, setOptionCodes] = useRecoilState(optionCodesState);

  useEffect(() => {
    const fetchData = async () => {
      if (
        modelCode !== undefined &&
        intColor !== undefined &&
        intColor.code !== ""
      ) {
        try {
          const newOptions = new Map();
          const newTuixs = new Map();
          const newOptionCodes = new Set(optionCodes);

          /** 옵션 정보 */
          const options = await getOptions(modelCode, intColor.code);
          InitOptions(newOptions, newTuixs, newOptionCodes, options);

          /** 내장색상 때문에 자동으로 선택되어야 하는 옵션 정보 */
          const autoChoiceOptions = await getAutoChoiceOptions(
            modelCode,
            intColor.code
          );
          choiceOptions(newOptions, newOptionCodes, autoChoiceOptions);

          setOptions(newOptions);
          setTuixs(newTuixs);
          setOptionCodes(newOptionCodes);
        } catch (error) {
          alert(error.response.data.message);
          navigate(ROUTE_PATH.ROOT);
        }
      }
    };
    fetchData();
  }, [modelCode, intColor]);
};

/**
 * UTILS
 */
const InitOptions = (
  newOptions: OptionMap,
  newTuixs: OptionMap,
  newOptionCodes: Set<string>,
  options: OptionInfo[]
) => {
  options.map((option) => {
    if (option.optionTypeName === OPTION_TYPE.DETAIL) {
      if (!option.isSelectable) {
        newOptionCodes.delete(option.optionCode);
      }
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
      isDeselectable: true,
    });
    newOptionCodes.add(option.optionCode);
  });
};
