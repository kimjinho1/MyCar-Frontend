import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { carInfoState } from "@/stores";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/common";
import { routerPath } from "@/routes";
import { VerticalLine } from "@/common/VerticalLine/VerticalLine";

export const MakingModelHeader = () => {
  const carInfo = useRecoilValue(carInfoState);
  const carCode = carInfo.code;
  const carName = carInfo.name;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routerPath.getSelectModelPath(carCode));
  };

  return (
    <MakingModelHeaderDiv>
      <Logo carName={carName} />
      <StepWrap>
        <StepDiv onClick={handleClick}>
          <p>01&nbsp;&nbsp;모델 선택</p>
        </StepDiv>
        <StepDiv>
          <VerticalLine />
        </StepDiv>
        <StepDiv>
          <strong>02&nbsp;&nbsp;내 차 만들기</strong>
        </StepDiv>
        <RightAlignedStepDiv>
          <p>요약 보기</p>
        </RightAlignedStepDiv>
      </StepWrap>
    </MakingModelHeaderDiv>
  );
};

const MakingModelHeaderDiv = styled.div`
  width: 100%;
  padding: 10px 25px;
  background-color: #e4dcd3;
`;

const StepWrap = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StepDiv = styled.div`
  display: flex;

  > strong {
    font-size: 14px;
  }

  > p {
    margin: 0;
    font-size: 14px;
    cursor: pointer;
  }
`;

const RightAlignedStepDiv = styled.div`
  margin-left: auto;
  padding: 4px;
  border: black 1px solid;
  cursor: pointer;

  > p {
    margin: 0;
    font-size: 14px;
  }
`;
