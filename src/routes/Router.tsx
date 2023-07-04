import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  Layout,
  MainHeader,
  MakingModelHeader,
  SelectModelHeader,
} from "@/layouts";
import { MainPage, SelectModelPage, MakingModelPage } from "@/pages";
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
        <Route
          path={routerPath.ROOT}
          element={
            <Layout header={<MainHeader />}>
              <MainPage />
            </Layout>
          }
        />

        <Route
          path={routerPath.SELECT_MODEL}
          element={
            <Layout header={<SelectModelHeader />}>
              <SelectModelPage />
            </Layout>
          }
        />

        <Route
          path={routerPath.MAKING_MODEL}
          element={
            <Layout header={<MakingModelHeader />}>
              <MakingModelPage />
            </Layout>
          }
        />

        {/* <Route element={<SelectModelLayout />}>
          <Route path={routerPath.ESTIMATION} element={<MainPage />} />
        </Route> */}

        <Route path="*" element={<RedirectComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
