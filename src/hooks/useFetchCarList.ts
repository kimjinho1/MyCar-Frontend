import { getCarInfos } from "@/services/model";
import { carListState, carTypeCodeState } from "@/stores/carState";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useFetchCarList = () => {
  const setCarInfos = useSetRecoilState(carListState);
  const setSelectedCarTypeCode = useSetRecoilState(carTypeCodeState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarInfos();
        setCarInfos(data);
        setSelectedCarTypeCode(data[0].carTypeCode);
      } catch (error) {
        alert("백엔드가 시딩이 안된 상태입니다.");
      }
    };
    fetchData();
  }, [setCarInfos, setSelectedCarTypeCode]);
};
