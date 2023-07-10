import styled from "styled-components";

export const MainHeader = () => {
  return (
    <MainHeaderDiv>
      <img src={`/Logo.svg`} alt="현대 로고" />
    </MainHeaderDiv>
  );
};

const MainHeaderDiv = styled.div`
  width: 100%;
  padding: 15px 25px;

  > img {
    width: 120px;
    margin-right: 15px;
    cursor: pointer;
  }
`;
