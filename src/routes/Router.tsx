import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ROUTES } from "./ROUTES";
import Header from "@/components/elements/Header";
import SelectCar from "@/pages/SelectCar";
import SelectModel from "@/pages/SelectModel";
import SelectOption from "@/pages/SelectOption";
import Footer from "@/components/elements/Footer";

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(ROUTES.ROOT);
  }, [navigate]);

  return null;
};

/*
<Routes>

<Route element={<MainLayout />}>
  <Route path="/" element={<MainPage />} />
</Route>
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
        <Route
          path="/"
          element={
            <>
              <Header stepNum={0} /> <SelectCar />
            </>
          }
        />
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
