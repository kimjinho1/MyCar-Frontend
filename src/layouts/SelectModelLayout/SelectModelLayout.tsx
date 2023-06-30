import { Outlet } from "react-router-dom";
import { SelectModelHeader } from ".";

export const SelectModelLayout = () => {
  return (
    <>
      <SelectModelHeader />
      <Outlet />
    </>
  );
};
