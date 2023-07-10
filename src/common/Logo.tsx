import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type LogoProps = {
  carName: string;
};

export const Logo = ({ carName }: LogoProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <LogoDiv>
      <img src={"/Logo.svg"} alt="현대 로고" onClick={handleClick} />
      {carName === "" ? null : <p>{carName}</p>}
    </LogoDiv>
  );
};

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;

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
