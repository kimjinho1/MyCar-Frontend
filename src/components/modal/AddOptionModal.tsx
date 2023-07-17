import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ModalConfirmButton, PopUpModal } from "@/components/common";
import { useImageUrl } from "@/hooks/utils/useImageUrl";
import {
  tuixsState,
  selectOptionState,
  changedOptionsState,
  optionsState,
  optionCodesState,
} from "@/stores/optionState";
import { PriceInfo } from "./PriceInfo";
import { ButtonContainer } from "./styles";
import { getTuixs } from "@/services/option";
import { useUpdateTuix } from "@/hooks/useUpdateTuix";
import { useParams } from "react-router-dom";

interface AddOptionModalProps {
  modelCode: string;
  onClose: () => void;
}

export const AddOptionModal = ({ modelCode, onClose }: AddOptionModalProps) => {
  const setOptions = useSetRecoilState(optionsState);
  const setTuixs = useSetRecoilState(tuixsState);
  const setSelectOption = useSetRecoilState(selectOptionState);
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
      <ChangeOptionModalDiv>
        {changedOptions && changedOptions.add.length > 0 && (
          <>
            <p>추과되는 품목</p>
            <OptionInfoWrap>
              {changedOptions.add.map((option) => {
                return (
                  <OptionInfoDiv key={option.optionCode}>
                    <img src={useImageUrl(option.optionImagePath)} />
                    <IconImgDiv>
                      <img src={"/SelectCheck.svg"} />
                    </IconImgDiv>
                    <p>{option.optionName}</p>
                    <b>{option.optionPrice.toLocaleString()} 원</b>
                  </OptionInfoDiv>
                );
              })}
            </OptionInfoWrap>
          </>
        )}
        {changedOptions && changedOptions.remove.length > 0 && (
          <>
            <p>삭제되는 품목</p>
            <OptionInfoWrap>
              {changedOptions.remove.map((option) => {
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
            </OptionInfoWrap>
          </>
        )}
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
    margin: 15px 0;
    font-size: 12px;
    font-weight: bold;
  }
`;

const OptionInfoWrap = styled.div`
  width: 100%;
  border-bottom: grey 1px solid;
  border-top: grey 1.5px solid;
`;

const OptionInfoDiv = styled.div`
  width: 100%;
  padding: 15px 0;
  display: flex;
  align-items: center;
  border-bottom: grey 0.5px solid;

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
