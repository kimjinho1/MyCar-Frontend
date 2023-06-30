import styled from "styled-components";
import { carInfosSelector } from "@/routes/stores/carInfosState";
import { useRecoilValue } from "recoil";
import { routerPath } from "@/routes";
import { useNavigate } from "react-router-dom";

export const CarList = () => {
  const carList = useRecoilValue(carInfosSelector);
  const navigate = useNavigate();

  const handleCarInfoClick = (carCode: string) => {
    navigate(routerPath.getSelectModelPath(carCode));
  };

  return (
    <CarListDiv>
      <CarListWrap>
        {carList.map((car) => {
          return (
            <CarInfoDiv
              key={car.carCode}
              onClick={() => handleCarInfoClick(car.carCode)}
            >
              <img src={import.meta.env.VITE_BACKEND_URL + car.carImagePath} />
              <strong>{car.carName}</strong>
              <p>{(car.carLowPrice / 10000).toLocaleString()}만원 ~</p>
            </CarInfoDiv>
          );
        })}
      </CarListWrap>
    </CarListDiv>
  );
};

const CarListDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarListWrap = styled.div`
  width: 85%;
  margin: 15px 0px;
  display: flex;
  align-items: center;
`;

const CarInfoDiv = styled.div`
  width: 200px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > img {
    width: 100%;
    object-fit: cover;
  }

  > strong {
    font-size: 18px;
  }

  > p {
    margin: 10px 0;
    font-size: 12px;
  }
`;
