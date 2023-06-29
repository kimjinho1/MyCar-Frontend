import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { CarInfoState } from "../stores/carState";

const SelectCar = () => {
  const resetSelectedCarInfo = useResetRecoilState(CarInfoState);
  useEffect(() => {
    resetSelectedCarInfo();
  }, []);

  return (
    <div>
      <h2>차량 선택 페이지</h2>
    </div>
  );
};

export default SelectCar;
