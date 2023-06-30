import { useEffect } from "react";
import { MainTitle, TabMenu, CarList, NoticeList } from ".";
import { getCarInfos } from "@/apis/api";
import {
  carInfosState,
  selectedCarTypeCodeState,
} from "@/stores/carInfosState";
import { useSetRecoilState } from "recoil";

export const MainPage = () => {
  const SetselectedCarTypeCode = useSetRecoilState(selectedCarTypeCodeState);
  const setCarInfos = useSetRecoilState(carInfosState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarInfos();
        setCarInfos(data);
        SetselectedCarTypeCode(data[0].carTypeCode);
      } catch (error) {
        alert("백엔드가 시딩이 안된 상태입니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <MainTitle />
      <TabMenu />
      <CarList />
      <NoticeList />
    </div>
  );
};
