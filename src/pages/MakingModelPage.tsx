import {
  ExtColor,
  IntColor,
  MakingModelHeader,
  Option,
  Preview,
} from "../components/MakingModelPage";
import { useFetchCarAndModel } from "@/hooks/useFetchCarAndModel";
import { useFetchColors } from "@/hooks/useFetchColors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageDiv, PageWrap } from "@/components/common/styles";
import { ModalConfirmButton } from "@/components/common";
import { useFetchEstimation } from "@/hooks/useFetchEstimation";
import { useResetOptions } from "@/hooks/useResetOptions";

export const MakingModelPage = () => {
  const { modelCode } = useParams();
  const resetOptions = useResetOptions();
  const fetchCarAndModel = useFetchCarAndModel();
  const fetchColors = useFetchColors();

  const fetchEstimation = useFetchEstimation();

  const handleConfirmClick = () => {
    fetchEstimation();
  };

  useEffect(() => {
    if (modelCode !== undefined) {
      resetOptions();
      fetchCarAndModel(modelCode);
      fetchColors(modelCode);
    }

    return () => {
      resetOptions();
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
