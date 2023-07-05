import styled from "styled-components";
import {
  selectedIntColorState,
  extColorInfosState,
  selectedExtColorState,
} from "@/stores/colorState";
import { useRecoilState, useRecoilValue } from "recoil";
import Block from "@/assets/svgs/Block.svg";
import SelectCheck from "@/assets/svgs/SelectCheck.svg";
import { ExtColorInfo } from "@/apis/api";

interface ExtColorBtnProps {
  imgurl: string;
}

export const ExtColor = () => {
  const selectedIntColor = useRecoilValue(selectedIntColorState);
  const [selectedExtColor, setSelectedExtColor] = useRecoilState(
    selectedExtColorState
  );
  const extColorInfos = useRecoilValue(extColorInfosState);

  const handleExtColorBtnClick = (extColorInfo: ExtColorInfo) => {
    const extColorCode = extColorInfo.extColorCode;
    const extColorName = extColorInfo.extColorName;

    if (extColorInfo.isSelectable) {
      setSelectedExtColor({
        code: extColorCode,
        name: extColorName,
      });
    }
  };

  return (
    <ExtColorDiv>
      <ExtColorTitleDiv>
        <b>외장색상</b>
        <span>{selectedExtColor.name}</span>
      </ExtColorTitleDiv>
      <ExtColorFlexDiv>
        {extColorInfos.map((extColorInfo) => {
          if (!extColorInfo.isSelectable) {
            return (
              <BlockedExtColorBtn
                key={extColorInfo.extColorCode}
                onClick={() => handleExtColorBtnClick(extColorInfo)}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  extColorInfo.extColorImagePath
                }
              ></BlockedExtColorBtn>
            );
          }

          if (extColorInfo.extColorCode === selectedExtColor.code) {
            return (
              <SelectedExtColorBtn
                key={extColorInfo.extColorCode}
                onClick={() => handleExtColorBtnClick(extColorInfo)}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  extColorInfo.extColorImagePath
                }
              ></SelectedExtColorBtn>
            );
          }

          return (
            <ExtColorBtn
              key={extColorInfo.extColorCode}
              onClick={() => handleExtColorBtnClick(extColorInfo)}
              imgurl={
                import.meta.env.VITE_BACKEND_URL +
                extColorInfo.extColorImagePath
              }
            ></ExtColorBtn>
          );
        })}
      </ExtColorFlexDiv>
    </ExtColorDiv>
  );
};

const ExtColorDiv = styled.div`
  width: 90%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExtColorTitleDiv = styled.div`
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

const ExtColorFlexDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const ExtColorBtn = styled.button<ExtColorBtnProps>`
  width: 100%;
  height: 35px;
  border: none;
  cursor: pointer;

  background-image: url(${({ imgurl }) => imgurl});
  background-size: auto;
  background-position: center;
`;

const SelectedExtColorBtn = styled.button<ExtColorBtnProps>`
  width: 100%;
  height: 35px;
  border: none;
  cursor: pointer;

  background-image: url(${SelectCheck}), url(${({ imgurl }) => imgurl});
  background-size: 18px, auto;
  background-position: center, center;
  background-repeat: no-repeat;
`;

const BlockedExtColorBtn = styled.button<ExtColorBtnProps>`
  width: 100%;
  height: 35px;
  border: none;
  cursor: pointer;

  background-image: url(${Block}),
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${({ imgurl }) => imgurl});
  background-size: 18px, cover, auto;
  background-position: center, center, center;
  background-repeat: no-repeat;
`;
