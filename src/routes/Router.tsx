import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ROUTES } from "./ROUTES";
import SelectModel from "@/pages/SelectModel";
import SelectOption from "@/pages/SelectOption";
import Footer from "@/layouts/Footer/Footer";
import { MainLayout } from "@/layouts/MainLayout";
import MainPage from "@/pages/SelectCar";
import Header from "@/layouts/Header/Header";

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(ROUTES.ROOT);
  }, [navigate]);

  return null;
};

/*
<Route element={<SelectCarLayout />}>
  <Route path="/selectcar" element={<SelectCarPage />} />
<Route>

</Routes>

<SelectCarHeader data={data} />

type SelectCarHeaderProps ={
  data: SelectCarHeaderData;
}

type SelectCarHeaderData ={

}

*/
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        <Route
          path="/model/:carCode"
          element={
            <>
              <Header stepNum={1} /> <SelectModel />
            </>
          }
        />
        <Route
          path="/model/making/:modelCode"
          element={
            <>
              <Header stepNum={2} />
              <SelectOption />
            </>
          }
        />
        <Route path="*" element={<RedirectComponent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
