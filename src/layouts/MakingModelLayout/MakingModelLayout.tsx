import { Outlet } from "react-router-dom";
import { MakingModelHeader } from ".";

export const MakingModelLayout = () => {
  return (
    <>
      <MakingModelHeader />
      <Outlet />
    </>
  );
};
