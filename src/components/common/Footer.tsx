import styled from "styled-components";

export const Footer = () => {
  return (
    <FooterDiv>
      <FooterWrap>
        <LogoImgDiv>
          <img src={"/LogoWhite.svg"} />
        </LogoImgDiv>
        <InfoListDiv>
          <a
            href="https://github.com/kimjinho1/MyCar-Backend-NestJS"
            target="_blank"
          >
            Github(Backend)
          </a>
          <a href="https://github.com/kimjinho1/MyCar-Frontend" target="_blank">
            Github(Frontend)
          </a>
          <a href="https://autoever-my-car.gitbook.io/my-car/" target="_blank">
            GitBook
          </a>
          <a>Phone: 010-4847-8113</a>
          <a>Email: rlawlsgh8113@naver.com</a>
        </InfoListDiv>
      </FooterWrap>
    </FooterDiv>
  );
};

const FooterDiv = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  padding: 15px 80px;
  display: flex;
  align-items: center;
  background-color: #1c1b1b;
`;

const FooterWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  > p {
    color: #999999;
  }
`;

const LogoImgDiv = styled.div`
  width: 40px;
  margin-right: 40px;

  > img {
    width: 100%;
    object-fit: cover;
  }
`;

const InfoListDiv = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  > a {
    font-size: 10px;
    margin: 0;
    color: #999999;
    text-decoration: none;
  }
`;
