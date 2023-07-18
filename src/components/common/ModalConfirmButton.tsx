import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";

interface ModalButtonProps {
  widthPx: string;
  isConfirm: boolean;
}

export const ModalConfirmButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) &&
    !["isConfirm"].includes(prop),
})<ModalButtonProps>`
  width: ${({ widthPx }) => widthPx}px;
  margin-top: 5px;
  padding: 7px 0;
  background: ${({ isConfirm }) => (isConfirm ? "#313c7a" : "#666")};
  font-size: 11px;
  color: white;
  border: none;
  cursor: pointer;
`;
