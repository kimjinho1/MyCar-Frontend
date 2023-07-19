import { useImageUrl } from "@/hooks/utils/useImageUrl";
import { OptionInfo } from "@/types/option";
import styled from "styled-components";

type AddDelOptionInfoProps = {
  isAdd: boolean;
  options: OptionInfo[];
};

export const AddDelOptionInfo = ({ isAdd, options }: AddDelOptionInfoProps) => {
  return (
    <>
      <p>{isAdd ? "추과되는 품목" : "삭제되는 품목"}</p>
      <OptionInfoWrap>
        {options.map((option) => {
          return (
            <OptionInfoDiv key={option.optionCode}>
              <img src={useImageUrl(option.optionImagePath)} />
              <IconImgDiv>
                <img src={isAdd ? "/SelectCheck.svg" : "/X.svg"} />
              </IconImgDiv>
              <p>{option.optionName}</p>
              <b>{option.optionPrice.toLocaleString()} 원</b>
            </OptionInfoDiv>
          );
        })}
      </OptionInfoWrap>
    </>
  );
};

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
