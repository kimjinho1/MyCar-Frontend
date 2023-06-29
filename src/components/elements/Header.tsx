import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { CarInfoState } from "@/stores/carState";
import Logo from "@/assets/svgs/Logo.svg";

type HeaderProps = {
  stepNum: number;
}

const Header = ({ stepNum }: HeaderProps) => {
  const backgroundColor = stepNum === 0 ? "#fff" : "#e4dcd3";
  const CarInfo = useRecoilValue(CarInfoState);

  return (
    <HeaderDiv backgroundColor={backgroundColor}>
      <HeaderTop>
        <img src={Logo} alt="현대 로고" />
        <p>{CarInfo.name}</p>
      </HeaderTop>
      {stepNum === 0 ? null : (
        <StepDiv>
          <p>{String(stepNum).padStart(2, "0")}</p>
          <p>{stepNum === 1 ? "모델 선택" : "내 차 만들기"}</p>
        </StepDiv>
      )}
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div<{ backgroundColor: string }>`
  width: 100%;
  padding: 15px 25px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const HeaderTop = styled.div`
  display: flex;
  flex-direction: row;

  > img {
    width: 120px;
    margin-right: 15px;
    cursor: pointer;
  }

  > p {
    margin: 0;
    font-size: 12px;
    font-weight: bold;
  }
`;

const StepDiv = styled.div`
  margin-top: 20px;
  display: flex;

  > p {
    margin: 0;
    margin-right: 18px;
    font-size: 14px;
    font-weight: bold;
  }
`;

export default Header;
