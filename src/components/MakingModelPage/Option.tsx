import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { OptionDiv, OptionTitleDiv } from "./styles";
import { OptionGrid } from "./OptionGrid";
import { categorizedOptionState } from "@/stores/optionState";
import { changeOptionModalState } from "@/stores/modalState";
import { ChangeOptionModal } from "../modal/ChangeOptionModal";
import { useFetchOption } from "@/hooks/useFetchOption";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectedIntColorState } from "@/stores/colorState";

export const Option = () => {
  const { modelCode } = useParams();
  const intColor = useRecoilValue(selectedIntColorState);
  const categorizedOptions = useRecoilValue(categorizedOptionState);

  const fetchOption = useFetchOption();

  const [changeOptionModal, setChangeOptionModal] = useRecoilState(
    changeOptionModalState
  );
  const onClose = () => {
    setChangeOptionModal(false);
  };

  useEffect(() => {
    if (
      modelCode !== undefined &&
      intColor !== undefined &&
      intColor.code !== ""
    ) {
      fetchOption(modelCode, intColor.code);
    }
  }, [modelCode, intColor]);

  return (
    <>
      {changeOptionModal && <ChangeOptionModal onClose={onClose} />}
      <OptionDiv>
        <h2>옵션</h2>

        {categorizedOptions["detail"] && (
          <>
            <OptionTitleDiv>
              <b>상세 품목</b>
            </OptionTitleDiv>
            <OptionGrid options={categorizedOptions["detail"]} />
          </>
        )}

        {categorizedOptions["hga"] && (
          <>
            <TuixTitleDiv>
              <img src={"/Hga.svg"} />
              <p>
                다양한 일반 편의, 레저 상품 등으로 차별화 커스터마이징을 원하는
                고객의 니즈 및 라이프스타일을 지원합니다.
              </p>
            </TuixTitleDiv>
            <OptionGrid options={categorizedOptions["hga"]} />
          </>
        )}

        {categorizedOptions["performance"] &&
          categorizedOptions["performance"].filter(
            (option) => option.isSelectable
          ).length > 0 && (
            <>
              <TuixTitleDiv>
                <img src={"/Performance.svg"} />
                <p>
                  현대자동차의 모터스포츠 기술력과 노하우, 그리고 N의 유전자가
                  결합되어 지금까지 경험하지 못한 고성능 감성을 제시합니다.
                </p>
              </TuixTitleDiv>
              <OptionGrid options={categorizedOptions["performance"]} />
            </>
          )}
      </OptionDiv>
    </>
  );
};

export const TuixTitleDiv = styled.div`
  width: 100%;
  margin: 10px 0;

  > img {
    height: 25px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  > p {
    font-size: 10px;
  }
`;
