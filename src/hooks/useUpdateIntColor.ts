import { modelInfoState } from "@/stores/modelState";
import { selectedIntColorState, intColorInfosState } from "@/stores/colorState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getIntColorInfos } from "@/services/color";
import { ExtColorInfo } from "@/types/color";
import { setErrorModalInfoState } from "@/stores/modalState";

export const useUpdateIntColor = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

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
        imagePath: intColorInfos[0].intColorImagePath,
      });
    } catch (error: any) {
      setErrorModalInfo({
        messages: error.response.data.message,
        isRedirect: true,
      });
    }
  };

  return fetchIntColorInfos;
};
