import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { carInfoState } from "@/stores/carState";
import { Logo } from "@/components/common";
import { VerticalLine } from "@/components/common/VerticalLine";

export const SelectModelHeader = () => {
  const carInfo = useRecoilValue(carInfoState);
  const carName = carInfo.name;

  return (
    <SelectModelHeaderDiv>
      <Logo carName={carName} />
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
