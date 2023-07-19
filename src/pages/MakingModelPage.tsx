import {
  ExtColor,
  IntColor,
  MakingModelHeader,
  Option,
  Preview,
} from "../components/MakingModelPage";
import { useFetchCarAndModel } from "@/hooks/useFetchCarAndModel";
import { useFetchColors } from "@/hooks/useFetchColors";
import { optionCodesState } from "@/stores/optionState";
import { useResetRecoilState } from "recoil";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageDiv, PageWrap } from "@/components/common/styles";
import { ModalConfirmButton } from "@/components/common";
import { useFetchEstimation } from "@/hooks/useFetchEstimation";

export const MakingModelPage = () => {
  const { modelCode } = useParams();
  const resetOptionCodes = useResetRecoilState(optionCodesState);
  const fetchCarAndModel = useFetchCarAndModel();
  const fetchColors = useFetchColors();

  const fetchEstimation = useFetchEstimation();

  const handleConfirmClick = () => {
    fetchEstimation();
  };

  useEffect(() => {
    if (modelCode !== undefined) {
      resetOptionCodes();
      fetchCarAndModel(modelCode);
      fetchColors(modelCode);
    }

    return () => {
      resetOptionCodes();
    };
  }, [modelCode]);

  return (
    <PageDiv>
      <MakingModelHeader />
      <PageWrap>
        <Preview />
        <ExtColor />
        <IntColor />
        <Option />
        <ModalConfirmButton
          widthPx={"120"}
          isConfirm={true}
          onClick={handleConfirmClick}
        >
          내 차 만들기 완료
        </ModalConfirmButton>
      </PageWrap>
    </PageDiv>
  );
};
