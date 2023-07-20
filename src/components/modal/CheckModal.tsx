import styled from "styled-components";
import { ModalConfirmButton, PopUpModal } from "@/components/common";
import { ButtonContainer } from "./styles";
import { useNavigate } from "react-router-dom";

type CheckModalProps = {
  onClose: () => void;
  title: string;
  path: string;
};

export const CheckModal = ({ onClose, title, path }: CheckModalProps) => {
  const navigate = useNavigate();

  const OnConfirmClick = () => {
    navigate(path);
    onClose();
  };

  return (
    <PopUpModal onClose={onClose} widthPercent={80}>
      <HeadText>{title}</HeadText>

      <ButtonContainer>
        <ModalConfirmButton widthPx={"80"} isConfirm={false} onClick={onClose}>
          취소
        </ModalConfirmButton>
        <ModalConfirmButton
          widthPx={"80"}
          isConfirm={true}
          onClick={OnConfirmClick}
        >
          확인
        </ModalConfirmButton>
      </ButtonContainer>
    </PopUpModal>
  );
};

const HeadText = styled.p`
  margin: 0;
  padding-top: 70px;
  font-size: 18px;
  font-weight: bold;
`;
