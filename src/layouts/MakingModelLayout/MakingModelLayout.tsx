import { Outlet } from "react-router-dom";
import { MakingModelHeader } from "../MakingModelHeader";

export const MakingModelLayout = () => {
  return (
    <>
      <MakingModelHeader />
      <Outlet />
    </>
  );
};
