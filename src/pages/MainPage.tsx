import { PageDiv } from "@/components/common/styles";
import {
  MainHeader,
  MainTitle,
  TabMenu,
  CarList,
  NoticeList,
} from "../components/MainPage";
import { useFetchCarList } from "@/hooks/useFetchCarList";

export const MainPage = () => {
  useFetchCarList();

  return (
    <PageDiv>
      <MainHeader />
      <MainTitle />
      <TabMenu />
      <CarList />
      <NoticeList />
    </PageDiv>
  );
};
