import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ModalConfirmButton, PopUpModal } from "@/components/common";
import {
  tuixsState,
  changedOptionsState,
  optionsState,
  optionCodesState,
} from "@/stores/optionState";
import { PriceInfo } from "./PriceInfo";
import { ButtonContainer } from "./styles";
import { useUpdateTuix } from "@/hooks/useUpdateTuix";
import { AddDelOptionInfo } from "./AddDellOptionInfo";

type AddDelOptionModalProps = {
  modelCode: string;
  onClose: () => void;
};

export const AddDelOptionModal = ({
  modelCode,
  onClose,
}: AddDelOptionModalProps) => {
  const setOptions = useSetRecoilState(optionsState);
  const setTuixs = useSetRecoilState(tuixsState);
  const [optionCodes, setOptionCodes] = useRecoilState(optionCodesState);
  const newOptionCodes = new Set(optionCodes);

  const updateTuix = useUpdateTuix();

  const changedOptions = useRecoilValue(changedOptionsState);
  const changePrice =
    changedOptions.add.reduce((sum, option) => sum + option.optionPrice, 0) +
    changedOptions.remove.reduce((sum, option) => sum - option.optionPrice, 0);

  const handleConfirmClick = () => {
    setOptions(changedOptions.newOptions);
    setTuixs(changedOptions.newTuixs);
    changedOptions.add.map((option) => {
      newOptionCodes.add(option.optionCode);
    });
    changedOptions.remove.map((option) => {
      newOptionCodes.delete(option.optionCode);
    });
    setOptionCodes(newOptionCodes);

    updateTuix(
      modelCode,
      changedOptions.newOptions,
      changedOptions.newTuixs,
      newOptionCodes
    );

    onClose();
  };

  return (
    <PopUpModal onClose={onClose} widthPercent={85}>
      <AddDelOptionModalDiv>
        {changedOptions && changedOptions.add.length > 0 && (
          <AddDelOptionInfo isAdd={true} options={changedOptions.add} />
        )}
        {changedOptions && changedOptions.remove.length > 0 && (
          <AddDelOptionInfo isAdd={false} options={changedOptions.remove} />
        )}
      </AddDelOptionModalDiv>
      <PriceInfo price={changePrice} />
      <ButtonContainer>
        <ModalConfirmButton widthPx={"80"} isConfirm={false} onClick={onClose}>
          취소
        </ModalConfirmButton>
        <ModalConfirmButton
          widthPx={"80"}
          isConfirm={true}
          onClick={handleConfirmClick}
        >
          확인
        </ModalConfirmButton>
      </ButtonContainer>
    </PopUpModal>
  );
};

export const AddDelOptionModalDiv = styled.div`
  width: 80%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    align-self: flex-start;
    margin: 15px 0;
    font-size: 15px;
    font-weight: bold;
  }
`;
