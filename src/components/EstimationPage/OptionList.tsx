import { useImageUrl } from "@/hooks/utils/useImageUrl";
import { OptionInfo } from "@/types/estimation";
import styled from "styled-components";

type OptionListProps = {
  typeName: string;
  options: OptionInfo[];
};

export const OptionList = ({ typeName, options }: OptionListProps) => {
  return (
    <SelectedOptionInfoContainer>
      <SelectedOptionTypeWrap>
        <b>{typeName}</b>
      </SelectedOptionTypeWrap>

      <SelectedOptionInfoWrap>
        {options.map((option) => {
          return (
            <SelectedOptionInfoDiv key={option.code}>
              <img src={useImageUrl(option.imagePath)} />
              <span>{option.name}</span>
              <p>{option.price.toLocaleString()} 원</p>
            </SelectedOptionInfoDiv>
          );
        })}
      </SelectedOptionInfoWrap>
    </SelectedOptionInfoContainer>
  );
};

const SelectedOptionInfoContainer = styled.div`
  width: 100%;
  display: flex;
`;

const SelectedOptionTypeWrap = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;

  > b {
    font-size: 16px;
  }
`;

const SelectedOptionInfoWrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SelectedOptionInfoDiv = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  > img {
    width: 20%;
    max-width: 120px;
    max-height: 70px;
    object-fit: cover;
  }

  > span {
    width: 50%;
    padding-left: 20px;
    color: grey;
    font-size: 16px;
  }

  > p {
    margin: 0;
    font-size: 16px;
  }
`;
