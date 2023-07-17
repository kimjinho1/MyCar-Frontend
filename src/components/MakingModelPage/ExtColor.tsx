import { useUpdateIntColor } from "@/hooks/useUpdateIntColor";
import { extColorInfosState, selectedExtColorState } from "@/stores/colorState";
import { ExtColorInfo } from "@/types/color";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { OptionDiv, OptionImageBoxDiv, OptionTitleDiv } from "./styles";
import { setErrorModalInfoState } from "@/stores/modalState";

export const ExtColor = () => {
  const setErrorModalInfo = useSetRecoilState(setErrorModalInfoState);

  const [selectedExtColor, setSelectedExtColor] = useRecoilState(
    selectedExtColorState
  );
  const extColorInfos = useRecoilValue(extColorInfosState);

  const updateIntColor = useUpdateIntColor();

  const handleExtColorBtnClick = (extColorInfo: ExtColorInfo) => {
    const extColorCode = extColorInfo.extColorCode;
    const extColorName = extColorInfo.extColorName;

    if (!extColorInfo.isSelectable) {
      setErrorModalInfo({
        messages: `${extColorName} 색상은 선택하신 내장색과 함께 제공되지 않는 색상입니다.\n내장색상을 변경해주세요.`,
        isRedirect: false,
      });
      return;
    }

    setSelectedExtColor({
      code: extColorCode,
      name: extColorName,
    });

    /** 내장색상 업데이트 */
    updateIntColor(extColorInfo);
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
          return (
            <OptionImageBoxDiv
              key={extColorInfo.extColorCode}
              onClick={() => handleExtColorBtnClick(extColorInfo)}
              height={"35px"}
              title={extColorInfo.extColorName}
              imgurl={
                import.meta.env.VITE_BACKEND_URL +
                extColorInfo.extColorImagePath
              }
              hover={true}
              isBlocked={!extColorInfo.isSelectable}
              isSelected={extColorInfo.extColorCode === selectedExtColor.code}
            />
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
