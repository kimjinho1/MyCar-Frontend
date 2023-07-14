import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getOptions } from "@/services/option";
import { optionsState } from "@/stores/optionState";
import { ROUTE_PATH } from "@/Router";

export const useFetchOption = () => {
  const { modelCode } = useParams();
  const navigate = useNavigate();

  const setOptions = useSetRecoilState(optionsState);

  useEffect(() => {
    const fetchData = async () => {
      if (modelCode !== undefined) {
        try {
          /** 옵션 정보 */
          const options = await getOptions(modelCode);
          setOptions(
            options.map((option) => {
              return {
                ...option,
                isSelected: false,
              };
            })
          );
        } catch (error) {
          alert(error.response.data.message);
          navigate(ROUTE_PATH.ROOT);
        }
      }
    };
    fetchData();
  }, [modelCode]);
};
