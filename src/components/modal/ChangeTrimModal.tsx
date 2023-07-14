import styled from "styled-components";
import { ChangeableCarModelsWithTrim } from "@/types/color";
import { modelInfoState } from "@/stores/modelState";
import { newIntColorState } from "@/stores/colorState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { ModalConfirmButton, PopUpModal } from "@/components/common";
import { ROUTE_PATH } from "@/Router";
import { useImageUrl } from "@/hooks/useImageUrl";

interface ChangeTrimModalProps {
  newModelInfo: ChangeableCarModelsWithTrim;
  onClose: () => void;
}

export const ChangeTrimModal = ({
  newModelInfo,
  onClose,
}: ChangeTrimModalProps) => {
  const navigate = useNavigate();

  const modelInfo = useRecoilValue(modelInfoState);
  const newIntColor = useRecoilValue(newIntColorState);

  const changePrice = newModelInfo.modelPrice - modelInfo.price;

  const handleConfirmClick = () => {
    navigate(ROUTE_PATH.MAKING_MODEL(newModelInfo.modelCode));
    onClose();
  };

  return (
    <PopUpModal onClose={onClose} widthPercent={80}>
      <HeadText>
        {`${newIntColor.name} 색상은 트림 변경 후 선택 가능합니다.`}
      </HeadText>
      <ConfirmText>트림을 변경하시겠습니까?</ConfirmText>
      <TrimInfoContainer>
        <TrimInfoDiv>
          <p>현재 트림</p>
          <TrimInfoWrap>
            <img src={useImageUrl(modelInfo.imagePath)} />
            <TrimInfoTextDiv>
              <p>{modelInfo.trimName}</p>
              <b>{modelInfo.price.toLocaleString()} 원</b>
            </TrimInfoTextDiv>
          </TrimInfoWrap>
        </TrimInfoDiv>
        <span>{`>`}</span>
        <TrimInfoDiv>
          <p>변경 트림</p>
          <TrimInfoWrap>
            <img src={useImageUrl(newModelInfo.modelImagePath)} />
            <TrimInfoTextDiv>
              <p>{newModelInfo.trimName}</p>
              <b>{newModelInfo.modelPrice.toLocaleString()} 원</b>
            </TrimInfoTextDiv>
          </TrimInfoWrap>
        </TrimInfoDiv>
      </TrimInfoContainer>
      <PriceInfoDiv>
        <p>변경 금액</p>
        <b>
          {changePrice > 0
            ? `+${changePrice.toLocaleString()}`
            : changePrice.toLocaleString()}{" "}
          원
        </b>
      </PriceInfoDiv>
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

const HeadText = styled.p`
  margin: 0;
  padding-top: 70px;
  font-size: 18px;
  font-weight: bold;
`;

const ConfirmText = styled.p`
  margin: 0;
  padding-top: 30px;
  font-size: 12px;
`;

const TrimInfoContainer = styled.div`
  margin: 10px 0;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  > span {
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const TrimInfoDiv = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    margin: 15px;
    font-size: 13px;
  }
`;

const TrimInfoWrap = styled.div`
  width: 100%;
  padding: 20px 0;
  background-color: #f6f3f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 80%;
    object-fit: cover;
  }

  > p {
    margin: 15px;
    font-size: 13px;
  }
`;

const TrimInfoTextDiv = styled.div`
  width: 80%;

  > p {
    margin: 10px 0;
    font-size: 13px;
  }

  > b {
    margin: 0;
    font-size: 15px;
  }
`;

const PriceInfoDiv = styled.div`
  width: 80%;
  padding: 0 10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > p {
    margin: 0;
    font-size: 12px;
  }

  > b {
    font-size: 13px;
    color: #007fa8;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  margin: 40px 0;
`;
