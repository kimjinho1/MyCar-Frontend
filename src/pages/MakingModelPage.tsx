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

export const MakingModelPage = () => {
  const { modelCode } = useParams();
  const resetOptionCodes = useResetRecoilState(optionCodesState);
  const fetchCarAndModel = useFetchCarAndModel();
  const fetchColors = useFetchColors();

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
      </PageWrap>
    </PageDiv>
  );
};
