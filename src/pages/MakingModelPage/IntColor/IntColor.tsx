import styled from "styled-components";
import { selectedIntColorState, intColorInfosState } from "@/stores/colorState";
import { useRecoilState, useRecoilValue } from "recoil";
import Block from "@/assets/svgs/Block.svg";
import SelectCheck from "@/assets/svgs/SelectCheck.svg";
import { IntColorInfo } from "@/apis/api";

interface IntColorBtnProps {
  imgurl: string;
}

export const IntColor = () => {
  const intColorInfos = useRecoilValue(intColorInfosState);
  const [selectedIntColor, setSelectedIntColor] = useRecoilState(
    selectedIntColorState
  );

  const handleIntColorBtnClick = (intColorInfo: IntColorInfo) => {
    if (intColorInfo.isSelectable) {
      setSelectedIntColor({
        code: intColorInfo.intColorCode,
        name: intColorInfo.intColorName,
      });
      return;
    }
    alert("선택할 수 없는 내장색상입니다.");
  };

  return (
    <IntColorDiv>
      <IntColorTitleDiv>
        <b>내장색상</b>
        <span>{selectedIntColor.name}</span>
      </IntColorTitleDiv>
      <IntColorGridDiv>
        {intColorInfos.map((intColorInfo) => {
          if (!intColorInfo.isSelectable) {
            return (
              <BlockedIntColorBtn
                key={intColorInfo.intColorCode}
                onClick={() => handleIntColorBtnClick(intColorInfo)}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  intColorInfo.intColorImagePath
                }
              ></BlockedIntColorBtn>
            );
          }

          if (intColorInfo.intColorCode === selectedIntColor.code) {
            return (
              <SelectedIntColorBtn
                key={intColorInfo.intColorCode}
                onClick={() => handleIntColorBtnClick(intColorInfo)}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  intColorInfo.intColorImagePath
                }
              ></SelectedIntColorBtn>
            );
          }

          return (
            <IntColorBtn
              key={intColorInfo.intColorCode}
              onClick={() => handleIntColorBtnClick(intColorInfo)}
              imgurl={
                import.meta.env.VITE_BACKEND_URL +
                intColorInfo.intColorImagePath
              }
            ></IntColorBtn>
          );
        })}
      </IntColorGridDiv>
    </IntColorDiv>
  );
};

const IntColorDiv = styled.div`
  width: 90%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntColorTitleDiv = styled.div`
  width: 100%;
  padding-bottom: 12px;
  border-bottom: grey 0.5px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > b {
    margin: 0;
    font-size: 13px;
  }

  > span {
    margin: 0;
    font-size: 10px;
    color: #666;
  }
`;

const IntColorGridDiv = styled.div`
  width: 100%;
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
`;

const IntColorBtn = styled.button<IntColorBtnProps>`
  width: 100%;
  height: 30px;
  border: none;
  cursor: pointer;

  background-image: url(${({ imgurl }) => imgurl});
  background-size: 200%;
  background-position: right center;
`;

const SelectedIntColorBtn = styled.button<IntColorBtnProps>`
  width: 100%;
  height: 30px;
  border: none;
  cursor: pointer;

  background-image: url(${SelectCheck}), url(${({ imgurl }) => imgurl});
  background-size: 20px, 200%;
  background-position: center, right center;
  background-repeat: no-repeat;
`;

const BlockedIntColorBtn = styled.button<IntColorBtnProps>`
  width: 100%;
  height: 30px;
  border: none;
  cursor: pointer;

  background-image: url(${Block}), url(${({ imgurl }) => imgurl});
  background-size: 20px, 200%;
  background-position: center, right center;
  background-repeat: no-repeat;
`;
