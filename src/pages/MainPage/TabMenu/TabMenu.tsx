import styled from "styled-components";
import { carTypesSelector, carTypeCodeState } from "@/stores/carState";
import { useRecoilState, useRecoilValue } from "recoil";

type CarTypeProps = {
  selected: boolean;
};

export const TabMenu = () => {
  const [selectedCarTypeCode, SetselectedCarTypeCode] =
    useRecoilState(carTypeCodeState);
  const carTypes = useRecoilValue(carTypesSelector);

  const handleCarTypeClick = (carTypeCode: string) => {
    SetselectedCarTypeCode(carTypeCode);
  };

  return (
    <TabMenuDiv>
      <TabMenuWrap>
        <strong>모델 선택</strong>
        {carTypes.map((carType) => {
          return (
            <CarTypeDiv
              key={carType.carTypeCode}
              selected={carType.carTypeCode === selectedCarTypeCode}
              onClick={() => handleCarTypeClick(carType.carTypeCode)}
            >
              <p>{carType.carTypeName}</p>
            </CarTypeDiv>
          );
        })}
      </TabMenuWrap>
    </TabMenuDiv>
  );
};

const TabMenuDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: grey 0.5px solid;
`;

const TabMenuWrap = styled.div`
  width: 80%;
  margin: 15px 0px;
  display: flex;
  align-items: center;
  gap: 40px;

  > strong {
    font-size: 14px;
  }
`;

const CarTypeDiv = styled.div<CarTypeProps>`
  cursor: pointer;

  > p {
    margin: 0;
    font-size: 14px;
    color: ${({ selected }) => (selected ? "#4d92e7" : "grey")};
  }
`;
