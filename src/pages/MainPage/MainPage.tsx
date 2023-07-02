import { useEffect } from "react";
import { MainTitle, TabMenu, CarList, NoticeList } from ".";
import { getCarInfos } from "@/apis/api";
import { carListState, carTypeCodeState } from "@/stores/carState";
import { useSetRecoilState } from "recoil";

export const MainPage = () => {
  const SetselectedCarTypeCode = useSetRecoilState(carTypeCodeState);
  const setCarInfos = useSetRecoilState(carListState);

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
