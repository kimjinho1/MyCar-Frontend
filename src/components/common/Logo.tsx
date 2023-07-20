import styled from "styled-components";
import { ROUTE_PATH } from "@/Router";
import { useState } from "react";
import { CheckModal } from "../modal/CheckModal";

type LogoProps = {
  carName: string;
};

export const Logo = ({ carName }: LogoProps) => {
  // 모달 관리
  const [isOpenCheckModal, setIsOpenCheckModal] = useState<boolean>(false);
  const onClose = () => {
    setIsOpenCheckModal(false);
  };

  const handleOnClickLogo = () => {
    setIsOpenCheckModal(true);
  };

  return (
    <LogoDiv>
      {isOpenCheckModal && (
        <CheckModal
          onClose={onClose}
          title={"내 차 만들기를 종료하시겠습니까?"}
          path={ROUTE_PATH.ROOT}
        />
      )}
      <img src={"/Logo.svg"} alt="현대 로고" onClick={handleOnClickLogo} />
      {carName && <p>{carName}</p>}
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
    font-size: 12px;
    font-weight: bold;
  }
`;
