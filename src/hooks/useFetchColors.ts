import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  selectedIntColorState,
  intColorInfosState,
  extColorInfosState,
  selectedExtColorState,
  newIntColorState,
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

  const fetchColors = async (modelCode: string) => {
    try {
      /** 내장색상 정보 */
      const intColorInfos = await getIntColorInfos(modelCode);
      setIntColors(intColorInfos);
      if (newIntColor.code !== "" && newIntColor.name != "") {
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
      setSelectedExtColor((prev) => {
        if (prev.code === "") {
          return {
            code: extColorInfos[0].extColorCode,
            name: extColorInfos[0].extColorName,
          };
        }
        return prev;
      });

      resetNewIntColor();
    } catch (error) {
      alert(error.response.data.message);
      navigate(ROUTE_PATH.ROOT);
    }
  };
  return fetchColors;
};
