import { extColorInfosState, selectedExtColorState } from "@/stores/colorState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getExtColorInfos } from "@/services/color";
import { setErrorModalInfoState } from "@/stores/modalState";

export const useUpdateExtColor = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const [selectedExtColor, setSelectedExtColor] = useRecoilState(
    selectedExtColorState
  );
  const setExtColors = useSetRecoilState(extColorInfosState);

  const fetchExtColorInfos = async (
    modelCode: string,
    intColorCode: string
  ) => {
    try {
      const extColorInfos = await getExtColorInfos(modelCode, intColorCode);
      setExtColors(extColorInfos);

      const selectableExtColorInfo = extColorInfos.find(
        (extColorInfo) =>
          extColorInfo.isSelectable &&
          extColorInfo.extColorCode === selectedExtColor.code
      );
      if (selectableExtColorInfo) {
        return;
      }
      setSelectedExtColor({
        code: extColorInfos[0].extColorCode,
        name: extColorInfos[0].extColorName,
      });
    } catch (error: any) {
      setErrorModalInfo({
        messages: error.response.data.message,
        isRedirect: true,
      });
    }
  };

  return fetchExtColorInfos;
};
