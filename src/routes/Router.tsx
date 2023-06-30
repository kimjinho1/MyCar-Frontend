import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  Footer,
  MainLayout,
  MakingModelLayout,
  SelectModelLayout,
} from "@/layouts";
import { MainPage, SelectModelPage, SelectOptionPage } from "@/pages";
import { routerPath } from ".";

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(routerPath.ROOT);
  }, [navigate]);

  return null;
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routerPath.ROOT} element={<MainPage />} />
        </Route>

        <Route element={<SelectModelLayout />}>
          <Route path={routerPath.SELECT_MODEL} element={<SelectModelPage />} />
        </Route>

        <Route element={<MakingModelLayout />}>
          <Route
            path={routerPath.MAKING_MODEL}
            element={<SelectOptionPage />}
          />
        </Route>

        {/* <Route element={<SelectModelLayout />}>
          <Route path={routerPath.ESTIMATION} element={<MainPage />} />
        </Route> */}

        <Route path="*" element={<RedirectComponent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
