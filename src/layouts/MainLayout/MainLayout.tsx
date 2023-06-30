import { Outlet } from "react-router-dom";
import { MainHeader } from ".";

export const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};
