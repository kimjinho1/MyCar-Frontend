import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  HorizontalLine,
  ModalConfirmButton,
  PopUpModal,
} from "@/components/common";
import { useImageUrl } from "@/hooks/utils/useImageUrl";
import {
  selectOptionState,
  changedOptionsState,
  optionsState,
  tuixsState,
} from "@/stores/optionState";
import { PriceInfo } from "./PriceInfo";
import { ButtonContainer } from "./styles";

interface ChangeOptionModalProps {
  onClose: () => void;
}

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
        <p>삭제되는 품목</p>
        <HorizontalLine />
        {changedOptions &&
          changedOptions.remove &&
          changedOptions.remove.map((option) => {
            return (
              <OptionInfoDiv key={option.optionCode}>
                <img src={useImageUrl(option.optionImagePath)} />
                <IconImgDiv>
                  <img src={"/X.svg"} />
                </IconImgDiv>
                <p>{option.optionName}</p>
                <b>{option.optionPrice.toLocaleString()} 원</b>
              </OptionInfoDiv>
            );
          })}
        <HorizontalLine />
      </ChangeOptionModalDiv>
      <PriceInfo price={changePrice} />
      <ButtonContainer>
        <ModalConfirmButton widthPx={80} isConfirm={false} onClick={onClose}>
          취소
        </ModalConfirmButton>
        <ModalConfirmButton
          widthPx={80}
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

const OptionInfoDiv = styled.div`
  width: 100%;
  margin: 15px 0;
  display: flex;
  align-items: center;

  > img {
    width: 12%;
    min-width: 50px;
    max-height: 40px;
    object-fit: cover;
  }

  > p {
    margin: 0;
    padding-left: 5px;
    width: 60%;
    font-size: 12px;
    font-weight: bolder;
  }

  > b {
    margin-left: auto;
    font-size: 12px;
    white-space: nowrap;
  }
`;

const IconImgDiv = styled.div`
  width: 15px;
  transform: translate(-32%, -100%);

  > img {
    width: 100%;
    object-fit: cover;
  }
`;
