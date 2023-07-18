import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { MainPage, SelectModelPage, MakingModelPage } from "@/pages";
import { Layout } from "@/components/common/Layout";
import { errorModalState } from "./stores/modalState";
import { useRecoilValue } from "recoil";
import { ErrorModal } from "./components/modal/ErrorModal";
import { EstimationPage } from "./pages/EstimationPage";

export const ROUTE_PATH = {
  ROOT: "/",
  SELECT_MODEL: (carCode: string) => `/model/${carCode}`,
  MAKING_MODEL: (modelCode: string) => `/model/making/${modelCode}`,
  ESTIMATION: "/estimation",
};

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(ROUTE_PATH.ROOT);
  }, [navigate]);

  return null;
};

const Router: React.FC = () => {
  const errorModalInfo = useRecoilValue(errorModalState);
  return (
    <BrowserRouter>
      {errorModalInfo && errorModalInfo.isOpen && errorModalInfo.messages && (
        <ErrorModal />
      )}
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
              <EstimationPage />
            </Layout>
          }
        />

        <Route path="*" element={<RedirectComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
