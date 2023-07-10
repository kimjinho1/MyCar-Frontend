import { OptionInfo } from "@/apis/option";
import { atom, selector } from "recoil";

export type OptionInfo = {
  optionId: number;
  optionCode: string;
  optionName: string;
  optionPrice: number;
  optionImagePath: string;
  optionTypeName: string;
  isSelectable: boolean;
};

export type ExtendedOptionInfo = OptionInfo & {
  isSelected: boolean;
};

/** 옵션들 정보 */
export const optionsState = atom<ExtendedOptionInfo[]>({
  key: "optionsState",
  default: [],
});

export const selectedOptionState = selector<string>({
  key: "setSelectedOption",
  get: ({ get }) => {
    throw new Error("Cannot get value of selectedOptionState selector");
  },
  set: ({ set, get }, optionCode) => {
    const options = get(optionsState);
    const newOptions = options.map((option) =>
      option.optionCode === optionCode
        ? { ...option, isSelected: !option.isSelected }
        : option
    );
    set(optionsState, newOptions);
  },
});
