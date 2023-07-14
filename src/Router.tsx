import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { MainPage, SelectModelPage, MakingModelPage } from "@/pages";
import { Layout } from "@/components/common/Layout";

export const ROUTE_PATH = {
  ROOT: "/",
  SELECT_MODEL: (carCode: string) => `/model/${carCode}`,
  MAKING_MODEL: (modelCode: string) => `/model/making/${modelCode}`,
};

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(ROUTE_PATH.ROOT);
  }, [navigate]);

  return null;
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />

        <Route
          path={"/model/:carCode"}
          element={
            <Layout>
              <SelectModelPage />
            </Layout>
          }
        />

        <Route
          path={"/model/making/:modelCode"}
          element={
            <Layout>
              <MakingModelPage />
            </Layout>
          }
        />

        <Route
          path={"/estimation"}
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />

        <Route path="*" element={<RedirectComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
