import styled from "styled-components";

import { modelInfoState } from "@/stores/modelState";
import { useRecoilValue } from "recoil";

export const Preview = () => {
  const modelInfo = useRecoilValue(modelInfoState);

  return (
    <PreviewDiv>
      <HeadDiv>
        <h2>{`${modelInfo.carName} - ${modelInfo.trimName}`}</h2>
        <HeadPriceDiv>
          <span>총 차량 가격</span>
          <b>{modelInfo.price.toLocaleString()} 원</b>
        </HeadPriceDiv>
      </HeadDiv>
      <ModelInfoDiv>
        <span>{`${modelInfo.fullName}`}</span>
        <button>모델 변경 &nbsp;{">"}</button>
      </ModelInfoDiv>
      {/* <CarImageDiv>
        <img src={import.meta.env.VITE_BACKEND_URL + modelInfo.imagePath} />
      </CarImageDiv> */}
    </PreviewDiv>
  );
};

const PreviewDiv = styled.div`
  width: 90%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeadDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  > h2 {
    margin: 0;
    font-size: 18px;
  }
`;

const HeadPriceDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  > span {
    font-size: 13px;
  }

  > b {
    font-size: 18px;
  }
`;

const ModelInfoDiv = styled.div`
  width: 100%;
  margin: 15px 0;

  > span {
    margin-right: 15px;
    font-size: 11px;
    color: #666;
  }

  > button {
    margin: 0;
    padding: 0;
    background-color: white;
    color: #007fa8;
    border: none;
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const CarImageDiv = styled.div`
  width: 100%;

  > img {
    width: 100%;
    object-fit: cover;
  }
`;
