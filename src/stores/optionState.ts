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

/** SET: 옵션 선택 */
export const selectedOptionState = selector<string>({
  key: "selectedOptionState",
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

/** GET: 옵션 카테코리 별로 분류 */
export const categorizedOptionState = selector({
  key: "categorizedOptionState",
  get: ({ get }) => {
    const options = get(optionsState);
    const categorizedOptions = options.reduce<{
      [key: string]: ExtendedOptionInfo[];
    }>((acc, option) => {
      const { optionTypeName } = option;
      if (!acc[optionTypeName]) {
        acc[optionTypeName] = [];
      }
      acc[optionTypeName].push(option);
      return acc;
    }, {});

    return categorizedOptions;
  },
});
