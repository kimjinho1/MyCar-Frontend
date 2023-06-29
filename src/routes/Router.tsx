import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ROUTES } from "./ROUTES";
import {
  Footer,
  MainLayout,
  MakingModelLayout,
  SelectModelLayout,
} from "@/layouts";
import { MainPage, SelectModelPage } from "@/pages";

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(ROUTES.ROOT);
  }, [navigate]);

  return null;
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.ROOT} element={<MainPage />} />
        </Route>

        <Route element={<SelectModelLayout />}>
          <Route path={ROUTES.SELECT_MODEL} element={<SelectModelPage />} />
        </Route>

        <Route element={<MakingModelLayout />}>
          <Route path={ROUTES.MAKING_MODEL} element={<MainPage />} />
        </Route>

        <Route element={<SelectModelLayout />}>
          <Route path={ROUTES.ESTIMATION} element={<MainPage />} />
        </Route>

        <Route path="*" element={<RedirectComponent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
