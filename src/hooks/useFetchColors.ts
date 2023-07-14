import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  selectedIntColorState,
  intColorInfosState,
  extColorInfosState,
  selectedExtColorState,
} from "@/stores/colorState";
import { getExtColorInfos, getIntColorInfos } from "@/services/color";
import { ROUTE_PATH } from "@/Router";

export const useFetchColors = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const setIntColors = useSetRecoilState(intColorInfosState);
  const setSelectedIntColor = useSetRecoilState(selectedIntColorState);
  const setExtColors = useSetRecoilState(extColorInfosState);
  const setSelectedExtColor = useSetRecoilState(selectedExtColorState);

  useEffect(() => {
    const fetchData = async () => {
      if (modelCode !== undefined) {
        try {
          /** 내장색상 정보 */
          const intColorInfos = await getIntColorInfos(modelCode);
          setIntColors(intColorInfos);
          setSelectedIntColor({
            code: intColorInfos[0].intColorCode,
            name: intColorInfos[0].intColorName,
          });

          /** 외장색상 정보 */
          const extColorInfos = await getExtColorInfos(
            modelCode,
            intColorInfos[0].intColorCode
          );
          setExtColors(extColorInfos);
          setSelectedExtColor({
            code: extColorInfos[0].extColorCode,
            name: extColorInfos[0].extColorName,
          });
        } catch (error) {
          alert(error.response.data.message);
          navigate(ROUTE_PATH.ROOT);
        }
      }
    };
    fetchData();
  }, [modelCode]);
};
