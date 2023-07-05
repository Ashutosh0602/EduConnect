import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/logIn" />} />
      <Route path="logIn" element={<LoginPage />} />
      <Route path="signUp" element={<SignupPage />} />
    </Routes>
    // <div className="App">
    //   <LoginPage />
    // </div>
  );
}

export default App;
