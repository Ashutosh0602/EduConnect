import "./App.css";
import Loader from "./components/loader/Loader";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import Layout from "./components/layout/Layout";
import React, { Suspense } from "react";
import TLayout from "./components/tLayout/TLayout";
import THome from "./components/tHome/THome";

const Home = React.lazy(() => import("./components/home/Home"));
const OClass = React.lazy(() => import("./components/class/OClass"));
const Setting = React.lazy(() => import("./components/setting/Setting"));
const TClass = React.lazy(() => import("./components/tClass/TClass"));

function App() {
  // debugger;
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/logIn" />} />
        <Route path="logIn" element={<LoginPage />} />
        <Route path="signUp" element={<SignupPage />} />
        <Route path="/student/:ID" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="class/:tid" element={<OClass />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/teacher/:ID" element={<TLayout />}>
          <Route path="" element={<THome />} />
          <Route path="/teacher/:ID/:SID" element={<TClass />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
