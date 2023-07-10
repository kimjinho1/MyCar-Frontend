import styled from "styled-components";
import {
  selectedIntColorState,
  extColorInfosState,
  selectedExtColorState,
  intColorInfosState,
} from "@/stores/colorState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ExtColorInfo, getIntColorInfos } from "@/apis";
import { BlockedOptionBtn, OptionBtn } from "@/components/common";
import { modelInfoState } from "@/stores";

interface ExtColorBtnProps {
  imgurl: string;
}

export const ExtColor = () => {
  const modelInfo = useRecoilValue(modelInfoState);
  const setIntColors = useSetRecoilState(intColorInfosState);
  const [selectedIntColor, setSelectedIntColor] = useRecoilState(
    selectedIntColorState
  );
  const [selectedExtColor, setSelectedExtColor] = useRecoilState(
    selectedExtColorState
  );
  const extColorInfos = useRecoilValue(extColorInfosState);

  const handleExtColorBtnClick = (extColorInfo: ExtColorInfo) => {
    const extColorCode = extColorInfo.extColorCode;
    const extColorName = extColorInfo.extColorName;

    if (!extColorInfo.isSelectable) {
      alert(`${extColorName} 색상은 선택하신 내장색과 함께 제공되지 않는 색상입니다.\n내장색상을 변경해주세요.
      `);
      return;
    }

    setSelectedExtColor({
      code: extColorCode,
      name: extColorName,
    });

    /** 내장색상 정보 */
    const fetchIntColorInfos = async () => {
      try {
        const intColorInfos = await getIntColorInfos(
          modelInfo.code,
          extColorInfo.extColorCode
        );
        setIntColors(intColorInfos);

        const selectableIntColorInfo = intColorInfos.find(
          (intColorInfo) =>
            intColorInfo.isSelectable &&
            intColorInfo.intColorCode === selectedIntColor.code
        );
        if (selectableIntColorInfo) {
          return;
        }
        setSelectedIntColor({
          code: intColorInfos[0].intColorCode,
          name: intColorInfos[0].intColorName,
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchIntColorInfos();
  };

  return (
    <ExtColorDiv>
      <ExtColorTitleDiv>
        <b>외장색상</b>
        <span>{selectedExtColor.name}</span>
      </ExtColorTitleDiv>
      <ExtColorFlexDiv>
        {extColorInfos.map((extColorInfo) => {
          if (extColorInfo.isSelectable) {
            return (
              <OptionBtn
                key={extColorInfo.extColorCode}
                onClick={() => handleExtColorBtnClick(extColorInfo)}
                height={"35px"}
                title={extColorInfo.extColorName}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  extColorInfo.extColorImagePath
                }
                selected={extColorInfo.extColorCode === selectedExtColor.code}
              ></OptionBtn>
            );
          }

          return (
            <BlockedOptionBtn
              key={extColorInfo.extColorCode}
              onClick={() => handleExtColorBtnClick(extColorInfo)}
              height={"35px"}
              title={extColorInfo.extColorName}
              imgurl={
                import.meta.env.VITE_BACKEND_URL +
                extColorInfo.extColorImagePath
              }
            ></BlockedOptionBtn>
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
