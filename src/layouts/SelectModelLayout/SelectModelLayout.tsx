import { Outlet } from "react-router-dom";
import { SelectModelHeader } from "../SelectModelHeader";

export const SelectModelLayout = () => {
  return (
    <>
      <SelectModelHeader />
      <Outlet />
    </>
  );
};
