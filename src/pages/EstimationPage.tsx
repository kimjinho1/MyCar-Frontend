import styled from "styled-components";
import { PageDiv, PageWrap } from "@/components/common/styles";

export const EstimationPage = () => {
  return (
    <PageDiv>
      <EstimationHeaderDiv>
        {/* <img src={"/Logo.svg"} alt="현대 로고" onClick={handleClick} /> */}
        <img src={"/Logo.svg"} alt="현대 로고" />
        <p>{"<"} 이전</p>
      </EstimationHeaderDiv>

      <PageWrap>
        <h1>abc</h1>
      </PageWrap>
    </PageDiv>
  );
};

const EstimationHeaderDiv = styled.div`
  width: 100%;
  padding: 15px 25px;
  background-color: #e4dcd3;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    width: 120px;
    margin-right: 15px;
    cursor: pointer;
  }

  > p {
    margin: 0;
    font-size: 12px;
    font-weight: bold;
  }
`;
