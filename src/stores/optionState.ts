import { ChangedOptionInfo, OptionInfo } from "@/types/option";
import { atom, selector } from "recoil";
import { modelInfoState } from "./modelState";

/** 옵션들 정보 */
export const optionsState = atom<Map<string, OptionInfo>>({
  key: "optionsState",
  default: new Map(),
});

/** 선택된 옵션 코드들 */
export const optionCodesState = atom<Set<string>>({
  key: "optionCodesState",
  default: new Set(),
});

/** TUIX들 정보 */
export const tuixsState = atom<Map<string, OptionInfo>>({
  key: "tuixsState",
  default: new Map(),
});

/** 옵션 선택 시 선택, 선택해제 되는 옵션들 정보 */
export const changedOptionsState = atom<ChangedOptionInfo>({
  key: "changedOptionsState",
  default: { add: [], remove: [] },
});

/** SET: 옵션 선택 */
export const selectOptionState = selector<string>({
  key: "selectOptionState",
  get: ({ get }) => {
    throw new Error("Cannot get value of selectedOptionState selector");
  },
  set: ({ set, get }, optionCode) => {
    if (typeof optionCode === "string") {
      const optionCodes = get(optionCodesState);
      const newOptionCodes = new Set(optionCodes);
      newOptionCodes.has(optionCode)
        ? newOptionCodes.delete(optionCode)
        : newOptionCodes.add(optionCode);
      set(optionCodesState, newOptionCodes);
    }
  },
});

/** GET: 옵션 카테코리 별로 분류 */
export const categorizedOptionState = selector({
  key: "categorizedOptionState",
  get: ({ get }) => {
    const options = get(optionsState);
    const tuixs = get(tuixsState);
    const categorizedOptions = [...options].concat([...tuixs]).reduce<{
      [key: string]: OptionInfo[];
    }>((acc, [optionCode, option]) => {
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

/** GET: 선택된 옵션들의 정보 */
export const selectedOptionState = selector({
  key: "selectedOptionState",
  get: ({ get }) => {
    const options = get(optionsState);
    const tuixs = get(tuixsState);
    const optionCodes = get(optionCodesState);
    return Array.from(options.values())
      .concat(Array.from(tuixs.values()))
      .filter((option) => optionCodes.has(option.optionCode));
  },
});

/** GET: 총 가격 */
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
