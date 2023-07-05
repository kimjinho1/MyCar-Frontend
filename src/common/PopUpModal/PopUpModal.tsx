import React from "react";
import styled from "styled-components";

type PopUpModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export const PopUpModal = ({ onClose, children }: PopUpModalProps) => {
  return (
    <ModalOutside onClick={onClose}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <XButton onClick={onClose}>&times;</XButton>
        {children}
      </ModalContainer>
    </ModalOutside>
  );
};

export const ModalOutside = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 300;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);

  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

export const XButton = styled.strong`
  position: absolute;
  top: -5px;
  right: 0;
  font-size: 20px;
  color: #c2c2c2;
  cursor: pointer;
  font-weight: bold;
  margin: 15px;
`;
