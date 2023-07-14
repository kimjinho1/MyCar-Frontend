import styled from "styled-components";
import {
  SelectModelHeader,
  FilterList,
  NoticeList,
  TrimList,
} from "../components/SelectModelPage";
import { useFetchCar } from "@/hooks/useFetchCar";
import { useFetchModelFilterAndTrim } from "@/hooks/useFetchModelFilterAndTrim";

export const SelectModelPage = () => {
  useFetchCar();
  useFetchModelFilterAndTrim();

  return (
    <SelectModelPageDiv>
      <SelectModelHeader />
      <FilterList />
      <TrimList />
      <NoticeList />
    </SelectModelPageDiv>
  );
};

const SelectModelPageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
