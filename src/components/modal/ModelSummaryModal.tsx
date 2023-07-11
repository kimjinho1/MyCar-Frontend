import { PopUpModal } from "@/components/common";
import React from "react";

interface ModelSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelSummaryModal = ({
  isOpen,
  onClose,
}: ModelSummaryModalProps) => {
  return (
    <div>
      {isOpen && (
        <PopUpModal onClose={onClose} widthPercent={50}>
          <h1>abc</h1>
        </PopUpModal>
      )}
    </div>
  );
};
