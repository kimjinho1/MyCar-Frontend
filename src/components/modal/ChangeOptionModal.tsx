import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ModalConfirmButton, PopUpModal } from "@/components/common";
import {
  selectOptionState,
  changedOptionsState,
  optionsState,
  tuixsState,
} from "@/stores/optionState";
import { PriceInfo } from "./PriceInfo";
import { ButtonContainer } from "./styles";
import { AddDelOptionInfo } from "./AddDellOptionInfo";

type ChangeOptionModalProps = {
  onClose: () => void;
};

export const ChangeOptionModal = ({ onClose }: ChangeOptionModalProps) => {
  const setOptions = useSetRecoilState(optionsState);
  const setTuixs = useSetRecoilState(tuixsState);
  const setSelectOption = useSetRecoilState(selectOptionState);

  const changedOptions = useRecoilValue(changedOptionsState);
  const changePrice = changedOptions.remove.reduce(
    (sum, option) => sum - option.optionPrice,
    0
  );

  const handleConfirmClick = () => {
    setOptions(changedOptions.newOptions);
    setTuixs(changedOptions.newTuixs);
    changedOptions.remove.map((option) => {
      setSelectOption(option.optionCode);
    });
    setSelectOption(changedOptions.optionCode);
    onClose();
  };

  return (
    <PopUpModal onClose={onClose} widthPercent={85}>
      <ChangeOptionModalDiv>
        {changedOptions && changedOptions.remove.length > 0 && (
          <AddDelOptionInfo isAdd={false} options={changedOptions.remove} />
        )}
      </ChangeOptionModalDiv>
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

const ChangeOptionModalDiv = styled.div`
  width: 80%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    align-self: flex-start;
    margin: 0;
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: bold;
  }
`;
