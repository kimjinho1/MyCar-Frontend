import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/common";
import { VerticalLine } from "@/components/common/VerticalLine";
import { useState } from "react";
import { ModelSummaryModal } from "../modal";
import { carInfoState } from "@/stores/carState";

export const MakingModelHeader = () => {
  const carInfo = useRecoilValue(carInfoState);
  const carCode = carInfo.code;
  const carName = carInfo.name;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/model/${carCode}`);
  };

  // 모달 관리
  const [isOpenModelSummaryModal, setIsOpenModelSummaryModal] =
    useState<boolean>(false);
  const onClose = () => {
    setIsOpenModelSummaryModal(false);
  };

  const handleOnClick = () => {
    setIsOpenModelSummaryModal(true);
  };

  return (
    <>
      {isOpenModelSummaryModal && <ModelSummaryModal onClose={onClose} />}
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
          <RightAlignedStepDiv onClick={handleOnClick}>
            <p>요약 보기</p>
          </RightAlignedStepDiv>
        </StepWrap>
      </MakingModelHeaderDiv>
    </>
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
