import {
  SelectModelHeader,
  FilterList,
  NoticeList,
  TrimList,
} from "../components/SelectModelPage";
import { useFetchCar } from "@/hooks/useFetchCar";
import { useFetchModelFilterAndTrim } from "@/hooks/useFetchModelFilterAndTrim";
import { PageDiv, PageWrap } from "@/components/common/styles";

export const SelectModelPage = () => {
  useFetchCar();
  useFetchModelFilterAndTrim();

  return (
    <PageDiv>
      <SelectModelHeader />
      <PageWrap>
        <FilterList />
        <TrimList />
        <NoticeList />
      </PageWrap>
    </PageDiv>
  );
};
