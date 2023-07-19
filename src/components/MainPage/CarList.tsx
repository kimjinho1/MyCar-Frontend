import styled from "styled-components";
import { carListSelector } from "@/stores/carState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/Router";
import { useImageUrl } from "@/hooks/utils/useImageUrl";

export const CarList = () => {
  const carList = useRecoilValue(carListSelector);
  const navigate = useNavigate();

  const handleCarInfoClick = (carCode: string) => {
    navigate(ROUTE_PATH.SELECT_MODEL(carCode));
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
              <img src={useImageUrl(car.carImagePath)} />
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
