import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  getAddPossibleOptions,
  getDisableOptions,
  getOptions,
} from "@/services/option";
import {
  optionCodesState,
  optionsState,
  selectOptionState,
  tuixsState,
} from "@/stores/optionState";
import { ROUTE_PATH } from "@/Router";
import { OPTION_TYPE } from "@/types/option";

export const useUpdateOption = () => {
  const { modelCode } = useParams();
  const [options, setOptions] = useRecoilState(optionsState);
  const setSelectOption = useSetRecoilState(selectOptionState);
  const [tuixs, setTuixs] = useRecoilState(tuixsState);
  // const resetTuixCodes = useResetRecoilState(tuixCodesState);

  const updateOption = async (modelCode: string, optionCode: string) => {
    if (modelCode !== undefined) {
      try {
        setSelectOption(optionCode);

        const newOptions = new Map(options);
        const newTuixs = new Map(tuixs);

        const addOption = await getAddPossibleOptions(modelCode, optionCode);
        addOption.map((option) => {
          if (option.optionCode === OPTION_TYPE.DETAIL) {
            newOptions.set(option.optionCode, {
              ...option,
              isSelectable: true,
            });
            return;
          }
          newTuixs.set(option.optionCode, option);
        });
        console.log(newOptions);
        console.log(newTuixs);

        const disableOption = await getDisableOptions(modelCode, optionCode);
        disableOption.map((option) => {
          if (option.optionTypeName === OPTION_TYPE.DETAIL) {
            newOptions.set(option.optionCode, {
              ...option,
              isSelectable: false,
            });
            return;
          }
          newTuixs.delete(option.optionCode);
        });

        setOptions(newOptions);
        setTuixs(newTuixs);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return updateOption;
};
