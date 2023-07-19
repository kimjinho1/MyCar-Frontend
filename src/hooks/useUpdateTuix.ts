import { useSetRecoilState } from "recoil";
import { optionCodesState, tuixsState } from "@/stores/optionState";
import { OptionInfo, OptionMap } from "@/types/option";
import { getTuixs } from "@/services/option";
import { setErrorModalInfoState } from "@/stores/modalState";

export const useUpdateTuix = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const setTuixs = useSetRecoilState(tuixsState);
  const setOptionCodes = useSetRecoilState(optionCodesState);

  const updateTuix = async (
    modelCode: string,
    options: OptionMap,
    tuixs: OptionMap,
    optionCodes: Set<string>
  ) => {
    try {
      const newTuixs = new Map<string, OptionInfo>();
      const newOptionCodes = new Set<string>(optionCodes);

      /** tuix 업데이트 */
      const detailOptionCodes = Array.from(optionCodes).filter((optionCode) =>
        options.has(optionCode)
      );
      const beforeOptionCode = detailOptionCodes.join(",");

      const tuixOptionCodes = Array.from(optionCodes).filter((optionCode) =>
        tuixs.has(optionCode)
      );
      const beforeTuixCode = tuixOptionCodes.join(",");

      const newTuixList = await getTuixs(
        modelCode,
        beforeOptionCode,
        beforeTuixCode
      );

      newTuixList.map((newTuix) => {
        newTuixs.set(newTuix.optionCode, newTuix);
      });

      const newTuixCodes = new Set(newTuixs.keys());
      Array.from(optionCodes).map((optionCode) => {
        if (!newTuixCodes.has(optionCode) && tuixs.has(optionCode)) {
          newOptionCodes.delete(optionCode);
        }
      });

      setTuixs(newTuixs);
      setOptionCodes(newOptionCodes);
    } catch (error: any) {
      setErrorModalInfo({
        messages: error.response.data.message,
        isRedirect: true,
      });
    }
  };
  return updateTuix;
};
