import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { CarInfoState } from "@/stores/carState";
import Logo from "@/assets/svgs/Logo.svg";

export const SelectModelHeader = () => {
  const CarInfo = useRecoilValue(CarInfoState);

  return (
    <SelectModelHeaderDiv>
      <LogoDiv>
        <img src={Logo} alt="현대 로고" />
        <p>{CarInfo.name}</p>
      </LogoDiv>
      <StepWrap>
        <StepDiv>
          <strong>01&nbsp;&nbsp;모델 선택</strong>
        </StepDiv>
        <StepDiv>
          <VerticalLine />
        </StepDiv>
        <StepDiv>
          <p>02&nbsp;&nbsp;내 차 만들기</p>
        </StepDiv>
      </StepWrap>
    </SelectModelHeaderDiv>
  );
};

const SelectModelHeaderDiv = styled.div`
  width: 100%;
  padding: 15px 25px;
  background-color: #e4dcd3;
`;

const LogoDiv = styled.div`
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

const StepWrap = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 25px;
`;

const StepDiv = styled.div`
  display: flex;

  > strong {
    font-size: 14px;
  }

  > p {
    margin: 0;
    font-size: 14px;
  }
`;

const VerticalLine = styled.div`
  border-left: 1px solid grey;
`;
