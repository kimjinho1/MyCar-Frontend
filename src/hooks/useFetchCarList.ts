import { getCarInfos } from "@/services/model";
import { carListState, carTypeCodeState } from "@/stores/carState";
import { setErrorModalInfoState } from "@/stores/modalState";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useFetchCarList = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const setCarInfos = useSetRecoilState(carListState);
  const setSelectedCarTypeCode = useSetRecoilState(carTypeCodeState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarInfos();
        setCarInfos(data);
        setSelectedCarTypeCode(data[0].carTypeCode);
      } catch (error: any) {
        setErrorModalInfo({
          messages: error.response.data.message,
          isRedirect: true,
        });
      }
    };
    fetchData();
  }, [setCarInfos, setSelectedCarTypeCode]);
};
