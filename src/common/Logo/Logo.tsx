import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoIcon from "@/assets/svgs/Logo.svg";
import { routerPath } from "@/routes";

type LogoProps = {
  carName: string;
};

export const Logo = ({ carName }: LogoProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routerPath.ROOT);
  };

  return (
    <LogoDiv>
      <img src={LogoIcon} alt="현대 로고" onClick={handleClick} />
      {carName === "" ? null : <p>{carName}</p>}
    </LogoDiv>
  );
};

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;

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
