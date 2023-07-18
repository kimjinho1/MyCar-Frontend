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
import { selectedOptionState, getTotalPriceState } from "@/stores/optionState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/Router";

interface SummaryViewModalProps {
  onClose: () => void;
}

export const SummaryViewModal = ({ onClose }: SummaryViewModalProps) => {
  const navigate = useNavigate();

  const modelInfo = useRecoilValue(modelInfoState);
  const intColor = useRecoilValue(selectedIntColorState);
  const extColor = useRecoilValue(selectedExtColorState);
  const options = useRecoilValue(selectedOptionState);
  const totalPrice = useRecoilValue(getTotalPriceState);

  const handleConfirmClick = () => {
    navigate(ROUTE_PATH.ESTIMATION);
    onClose();
  };

  return (
    <PopUpModal onClose={onClose} widthPercent={50}>
      <ModelSummaryModalDiv>
        <p>나의 {modelInfo.carName}</p>
        <span>요약 보기</span>
        <SummaryViewContainer>
          <SummaryViewDiv>
            <p>모델</p>
            <SelectedInfoListDiv>
              <SelectedInfoDiv>
                <p>{modelInfo.fullName}</p>
                <b>{modelInfo.price.toLocaleString()} 원</b>
              </SelectedInfoDiv>
            </SelectedInfoListDiv>
          </SummaryViewDiv>
          <HorizontalLine />

          <SummaryViewDiv>
            <p>색상</p>
            <SelectedInfoListDiv>
              <SelectedInfoDiv>
                <p>{intColor.name}</p>
                <b>-원</b>
              </SelectedInfoDiv>
              <SelectedInfoDiv>
                <p>{extColor.name}</p>
                <b>-원</b>
              </SelectedInfoDiv>
            </SelectedInfoListDiv>
          </SummaryViewDiv>
          <HorizontalLine />

          <SummaryViewDiv>
            <p>옵션</p>
            <SelectedInfoListDiv>
              {options.map((option) => {
                return (
                  <SelectedInfoDiv key={option.optionCode}>
                    <p>{option.optionName}</p>
                    <b>{option.optionPrice.toLocaleString()} 원</b>
                  </SelectedInfoDiv>
                );
              })}
            </SelectedInfoListDiv>
          </SummaryViewDiv>
        </SummaryViewContainer>

        <TotalPriceDiv>
          <p>총 차량 가격</p>
          <b>{totalPrice.toLocaleString()} 원</b>
        </TotalPriceDiv>

        <ModalConfirmButton
          widthPx={"100"}
          isConfirm={true}
          onClick={handleConfirmClick}
        >
          내 차 만들기 완료
        </ModalConfirmButton>
      </ModelSummaryModalDiv>
    </PopUpModal>
  );
};

const ModelSummaryModalDiv = styled.div`
  width: 80%;
  margin-top: 40px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    align-self: flex-start;
    margin: 0;
    margin-bottom: 20px;
    font-size: 15px;
    font-weight: bold;
  }

  > span {
    font-size: 13px;
  }
`;

const SummaryViewContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  border-bottom: grey 1.5px solid;
  border-top: grey 1.5px solid;
`;

const SummaryViewDiv = styled.div`
  width: 100%;
  margin: 8px 0;
  display: flex;

  > p {
    margin: 0;
    align-self: flex-start;
    width: 15%;
    font-size: 12px;
    font-weight: bolder;
  }
`;

const SelectedInfoListDiv = styled.div`
  width: 100%;

  > p {
    margin: 0;
    font-size: 10px;
    color: #666;
    font-weight: bolder;
  }
`;

const SelectedInfoDiv = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > p {
    width: 60%;
    margin: 0;
    font-size: 10px;
    color: #666;
  }

  > b {
    font-size: 11px;
    font-weight: bolder;
  }
`;

const TotalPriceDiv = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > p {
    margin: 0;
    font-size: 15px;
    font-weight: bold;
  }

  > b {
    font-size: 15px;
    color: #007fa8;
  }
`;
