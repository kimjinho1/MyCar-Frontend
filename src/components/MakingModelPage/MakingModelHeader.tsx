import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Logo } from "@/components/common";
import { VerticalLine } from "@/components/common/VerticalLine";
import { useState } from "react";
import { SummaryViewModal } from "../modal/SummaryViewModal";
import { carInfoState } from "@/stores/carState";
import { ROUTE_PATH } from "@/Router";
import { CheckModal } from "../modal/CheckModal";

export const MakingModelHeader = () => {
  const carInfo = useRecoilValue(carInfoState);
  const carCode = carInfo.code;
  const carName = carInfo.name;

  // 모델 선택 페이지 이동 모달 관리
  const [isOpenCheckModal, setIsOpenCheckModal] = useState<boolean>(false);
  const onCloseCheckModal = () => {
    setIsOpenCheckModal(false);
  };
  const handleOnGoSelectModelPageClick = () => {
    setIsOpenCheckModal(true);
  };

  // 모델 옵션들 요약 모달
  const [isOpenModelSummaryModal, setIsOpenModelSummaryModal] =
    useState<boolean>(false);
  const onCloseSummaryModal = () => {
    setIsOpenModelSummaryModal(false);
  };
  const handleOnSummaryModalClick = () => {
    setIsOpenModelSummaryModal(true);
  };

  return (
    <>
      {isOpenModelSummaryModal && (
        <SummaryViewModal onClose={onCloseSummaryModal} />
      )}
      {isOpenCheckModal && (
        <CheckModal
          onClose={onCloseCheckModal}
          title={"모델 선택 페이지로 넘어가시겠습니까?"}
          path={ROUTE_PATH.SELECT_MODEL(carCode)}
        />
      )}
      <MakingModelHeaderDiv>
        <Logo carName={carName} />
        <StepWrap>
          <StepDiv onClick={handleOnGoSelectModelPageClick}>
            <p>01&nbsp;&nbsp;모델 선택</p>
          </StepDiv>
          <StepDiv>
            <VerticalLine />
          </StepDiv>
          <StepDiv>
            <strong>02&nbsp;&nbsp;내 차 만들기</strong>
          </StepDiv>
          <RightAlignedStepDiv onClick={handleOnSummaryModalClick}>
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
    font-size: 14px;
  }
`;
