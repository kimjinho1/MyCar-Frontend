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
    <div>
      <MainHeader />
      <MainTitle />
      <TabMenu />
      <CarList />
      <NoticeList />
    </div>
  );
};
