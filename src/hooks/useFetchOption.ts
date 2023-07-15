import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { getOptions } from "@/services/option";
import {
  tuixCodesState,
  optionCodesState,
  optionsState,
  tuixsState,
} from "@/stores/optionState";
import { ROUTE_PATH } from "@/Router";
import { OPTION_TYPE } from "@/types/option";

export const useFetchOption = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const optionMap = new Map();
  const tuixMap = new Map();
  const setOptions = useSetRecoilState(optionsState);
  const resetOptionCodes = useResetRecoilState(optionCodesState);
  const setTuixs = useSetRecoilState(tuixsState);
  const resetTuixCodes = useResetRecoilState(tuixCodesState);

  useEffect(() => {
    const fetchData = async () => {
      if (modelCode !== undefined) {
        try {
          /** 옵션 정보 */
          const options = await getOptions(modelCode);
          options.map((option) => {
            if (option.optionTypeName === OPTION_TYPE.DETAIL) {
              optionMap.set(option.optionCode, option);
              return;
            }
            tuixMap.set(option.optionCode, option);
          });
          setOptions(optionMap);
          setTuixs(tuixMap);
          resetOptionCodes();
          resetTuixCodes();
        } catch (error) {
          alert(error.response.data.message);
          navigate(ROUTE_PATH.ROOT);
        }
      }
    };
    fetchData();
  }, [modelCode]);
};
