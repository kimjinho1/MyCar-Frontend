import styled from "styled-components";
import CloudSvg from "@/assets/svgs/Cloud.svg";

export const MainTitle = () => {
  return (
    <MainTitleDiv>
      <MainTitleWrap>
        <h1>내 차 만들기</h1>
        <p>내가 타고 싶은 나만의 차를 만들어보세요</p>
      </MainTitleWrap>
    </MainTitleDiv>
  );
};

const MainTitleDiv = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${CloudSvg});
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainTitleWrap = styled.div`
  width: 80%;
  height: 70%;
  background-color: rgba(255, 255, 255, 0.6);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h1 {
    margin: 0 0 25px 0;
  }

  > p {
    margin: 0;
    font-size: 14px;
  }
`;
