import styled from "styled-components";
import {
  HorizontalLine,
  ModalConfirmButton,
  PopUpModal,
} from "@/components/common";
import {
  selectedExtColorState,
  selectedIntColorState,
} from "@/stores/colorState";
import { modelInfoState } from "@/stores/modelState";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/Router";
import { errorModalState } from "@/stores/modalState";
import { useEffect } from "react";

export const ErrorModal = () => {
  const errorModalInfo = useRecoilValue(errorModalState);
  const resetErrorModal = useResetRecoilState(errorModalState);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorModalInfo.isRedirect) {
      navigate(ROUTE_PATH.ROOT);
    }
  }, [errorModalInfo]);

  const onClose = () => {
    resetErrorModal();
  };

  return (
    <PopUpModal onClose={onClose} widthPercent={60}>
      <ErrorModalDiv>
        {errorModalInfo.messages.map((message) => (
          <p key={message}>{message}</p>
        ))}
        <ModalConfirmButton widthPx={100} isConfirm={true} onClick={onClose}>
          확인
        </ModalConfirmButton>
      </ErrorModalDiv>
    </PopUpModal>
  );
};

const ErrorModalDiv = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    margin: 10px 0;
    font-size: 13px;
    font-weight: bold;
  }
`;
