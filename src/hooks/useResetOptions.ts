import {
  selectedExtColorState,
  selectedIntColorState,
} from "@/stores/colorState";
import { optionCodesState } from "@/stores/optionState";
import { useResetRecoilState } from "recoil";

export const useResetOptions = () => {
  const resetIntColor = useResetRecoilState(selectedIntColorState);
  const resetExtColor = useResetRecoilState(selectedExtColorState);
  const resetOptionCodes = useResetRecoilState(optionCodesState);

  const resetOptions = () => {
    resetIntColor();
    resetExtColor();
    resetOptionCodes();
  };
  return resetOptions;
};
