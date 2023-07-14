import { modelInfoState } from "@/stores/modelState";
import { selectedIntColorState, intColorInfosState } from "@/stores/colorState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getIntColorInfos } from "@/services/color";
import { ExtColorInfo } from "@/types/color";

export const useUpdateIntColor = () => {
  const modelInfo = useRecoilValue(modelInfoState);
  const setIntColors = useSetRecoilState(intColorInfosState);
  const [selectedIntColor, setSelectedIntColor] = useRecoilState(
    selectedIntColorState
  );

  const fetchIntColorInfos = async (extColorInfo: ExtColorInfo) => {
    try {
      const intColorInfos = await getIntColorInfos(
        modelInfo.code,
        extColorInfo.extColorCode
      );
      setIntColors(intColorInfos);

      const selectableIntColorInfo = intColorInfos.find(
        (intColorInfo) =>
          intColorInfo.isSelectable &&
          intColorInfo.intColorCode === selectedIntColor.code
      );
      if (selectableIntColorInfo) {
        return;
      }
      setSelectedIntColor({
        code: intColorInfos[0].intColorCode,
        name: intColorInfos[0].intColorName,
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return fetchIntColorInfos;
};
