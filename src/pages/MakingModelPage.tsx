import styled from "styled-components";
import {
  ExtColor,
  IntColor,
  MakingModelHeader,
  Option,
  Preview,
} from "../components/MakingModelPage";
import { useFetchCarAndModel } from "@/hooks/useFetchCarAndModel";
import { useFetchColors } from "@/hooks/useFetchColors";
import { useFetchOption } from "@/hooks/useFetchOption";
import { optionCodesState } from "@/stores/optionState";
import { useResetRecoilState } from "recoil";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const MakingModelPage = () => {
  const { modelCode } = useParams();
  const resetOptionCodes = useResetRecoilState(optionCodesState);

  const fetchCarAndModel = useFetchCarAndModel();
  const fetchColors = useFetchColors();
  useFetchOption();

  useEffect(() => {
    if (modelCode !== undefined) {
      resetOptionCodes();
      fetchCarAndModel(modelCode);
      fetchColors(modelCode);
    }
  }, [modelCode]);

  return (
    <MakingModelPageDiv>
      <MakingModelHeader />
      <MakingModelPageWrap>
        <Preview />
        <ExtColor />
        <IntColor />
        <Option />
      </MakingModelPageWrap>
    </MakingModelPageDiv>
  );
};

const MakingModelPageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MakingModelPageWrap = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
