import { OptionInfo } from "@/apis/option";
import { atom, selector } from "recoil";
import { modelInfoState } from "./modelState";

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
export const selectOptionState = selector<string>({
  key: "selectOptionState",
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

/** GET: 선택된 옵션들의 정보*/
export const selectedOptionState = selector({
  key: "selectedOptionState",
  get: ({ get }) => {
    const options = get(optionsState);
    const selectedOptions = options.filter((option) => option.isSelected);
    return selectedOptions;
  },
});

/** GET: 총 가격*/
export const getTotalPriceState = selector({
  key: "getTotalPriceState",
  get: ({ get }) => {
    const modelInfo = get(modelInfoState);
    const selectedOptions = get(selectedOptionState);

    const modelPrice = modelInfo.price;
    const optionTotalPrice = selectedOptions.reduce(
      (sum, option) => sum + option.optionPrice,
      0
    );
    const totalPrice = modelPrice + optionTotalPrice;

    return totalPrice;
  },
});
