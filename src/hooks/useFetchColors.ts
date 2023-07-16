import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  selectedIntColorState,
  intColorInfosState,
  extColorInfosState,
  selectedExtColorState,
  newIntColorState,
  newExtColorState,
} from "@/stores/colorState";
import { getExtColorInfos, getIntColorInfos } from "@/services/color";
import { ROUTE_PATH } from "@/Router";

export const useFetchColors = () => {
  const navigate = useNavigate();

  const setIntColors = useSetRecoilState(intColorInfosState);
  const setSelectedIntColor = useSetRecoilState(selectedIntColorState);
  const newIntColor = useRecoilValue(newIntColorState);
  const resetNewIntColor = useResetRecoilState(newIntColorState);

  const setExtColors = useSetRecoilState(extColorInfosState);
  const setSelectedExtColor = useSetRecoilState(selectedExtColorState);
  const newExtColor = useRecoilValue(newExtColorState);
  const resetNewExtColor = useResetRecoilState(newExtColorState);

  const fetchColors = async (modelCode: string) => {
    try {
      /** 내장색상 정보 */
      const intColorInfos = await getIntColorInfos(modelCode);
      setIntColors(intColorInfos);
      if (newIntColor.code !== "" && newIntColor.name !== "") {
        setSelectedIntColor({
          code: newIntColor.code,
          name: newIntColor.name,
        });
      } else {
        setSelectedIntColor({
          code: intColorInfos[0].intColorCode,
          name: intColorInfos[0].intColorName,
        });
      }

      /** 외장색상 정보 */
      const extColorInfos = await getExtColorInfos(
        modelCode,
        newIntColor.code !== ""
          ? newIntColor.code
          : intColorInfos[0].intColorCode
      );
      setExtColors(extColorInfos);
      const newExtColorInfo = extColorInfos.find(
        (extColor) => extColor.extColorCode === newExtColor.code
      );
      if (
        !(
          newExtColor.code !== "" &&
          newExtColor.name !== "" &&
          newExtColorInfo !== undefined &&
          newExtColorInfo.isSelectable
        )
      ) {
        setSelectedExtColor({
          code: extColorInfos[0].extColorCode,
          name: extColorInfos[0].extColorName,
        });
      }

      resetNewIntColor();
      resetNewExtColor();
    } catch (error) {
      alert(error.response.data.message);
      navigate(ROUTE_PATH.ROOT);
    }
  };
  return fetchColors;
};
