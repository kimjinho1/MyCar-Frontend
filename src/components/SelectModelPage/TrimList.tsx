import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { trimInfosState } from "@/stores/modelState";
import { useRecoilValue } from "recoil";
import { ROUTE_PATH } from "@/Router";
import { useImageUrl } from "@/hooks/utils/useImageUrl";

export const TrimList = () => {
  const navigate = useNavigate();

  const trimInfos = useRecoilValue(trimInfosState);

  const handleMakingModelButtonClick = (modelCode: string) => {
    navigate(ROUTE_PATH.MAKING_MODEL(modelCode));
  };

  return (
    <TrimListDiv>
      {trimInfos.map((trimInfo) => {
        return (
          <TrimContainer key={trimInfo.trimCode}>
            <TrimInfoDiv>
              <strong>{trimInfo.trimName}</strong>
              <p>{trimInfo.modelPrice.toLocaleString()} 원</p>
            </TrimInfoDiv>
            <TrimImageDiv>
              <img src={useImageUrl(trimInfo.modelImagePath)} />
            </TrimImageDiv>
            <FilterSummaryDiv>
              <p>{trimInfo.filterSummary}</p>
            </FilterSummaryDiv>
            <MakingModelButton
              onClick={() => handleMakingModelButtonClick(trimInfo.modelCode)}
            >
              내 차 만들기
            </MakingModelButton>
          </TrimContainer>
        );
      })}
    </TrimListDiv>
  );
};

const TrimListDiv = styled.div`
  width: 90%;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TrimContainer = styled.div`
  padding: 25px 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f6f3f2;
`;

const TrimInfoDiv = styled.div`
  margin-bottom: 30px;
  width: 70%;

  > strong {
    font-size: 16px;
  }

  > p {
    margin: 5px 0;
    font-size: 13px;
    font-weight: bolder;
  }
`;

const TrimImageDiv = styled.div`
  width: 85%;

  > img {
    width: 100%;
    object-fit: contain;
  }
`;

const FilterSummaryDiv = styled.div`
  margin: 15px 0;
  width: 70%;

  > p {
    font-size: 12px;
    color: #666;
  }
`;

const MakingModelButton = styled.button`
  margin-top: 15px;
  width: 75%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background-color: #002c5f;
  color: white;
  font-size: 12px;
  cursor: pointer;
`;
