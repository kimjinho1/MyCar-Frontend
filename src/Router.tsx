import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { MainPage, SelectModelPage, MakingModelPage } from "@/pages";
import { Layout } from "@/layouts/Layout";

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/");
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
