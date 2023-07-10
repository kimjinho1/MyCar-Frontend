import styled from "styled-components";
import {
  selectedIntColorState,
  extColorInfosState,
  selectedExtColorState,
  intColorInfosState,
} from "@/stores/colorState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ExtColorInfo, getIntColorInfos } from "@/apis/color";
import { modelInfoState } from "@/stores";
import {
  BlockedColorBoxDiv,
  OptionDiv,
  ColorBoxDiv,
  OptionTitleDiv,
} from "./styles";

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
    <OptionDiv>
      <h2>색상</h2>
      <OptionTitleDiv>
        <b>외장색상</b>
        <span>{selectedExtColor.name}</span>
      </OptionTitleDiv>
      <ExtColorFlexDiv>
        {extColorInfos.map((extColorInfo) => {
          if (extColorInfo.isSelectable) {
            return (
              <ColorBoxDiv
                key={extColorInfo.extColorCode}
                onClick={() => handleExtColorBtnClick(extColorInfo)}
                height={"35px"}
                title={extColorInfo.extColorName}
                imgurl={
                  import.meta.env.VITE_BACKEND_URL +
                  extColorInfo.extColorImagePath
                }
                selected={extColorInfo.extColorCode === selectedExtColor.code}
              ></ColorBoxDiv>
            );
          }

          return (
            <BlockedColorBoxDiv
              key={extColorInfo.extColorCode}
              onClick={() => handleExtColorBtnClick(extColorInfo)}
              height={"35px"}
              title={extColorInfo.extColorName}
              imgurl={
                import.meta.env.VITE_BACKEND_URL +
                extColorInfo.extColorImagePath
              }
            ></BlockedColorBoxDiv>
          );
        })}
      </ExtColorFlexDiv>
    </OptionDiv>
  );
};

const ExtColorFlexDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;
