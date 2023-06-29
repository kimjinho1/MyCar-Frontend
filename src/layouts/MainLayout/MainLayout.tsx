import { Outlet } from "react-router-dom";
import { MainHeader } from "../MainHeader";

export const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};
