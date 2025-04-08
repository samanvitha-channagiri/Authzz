import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import AuthLayout from "./pages/auth/AuthLayout";
// import LoginPage from "./pages/auth/login";
import Layout from "./Layout";
import { BrowserRouter, Route, Routes } from "react-router";
// import RegisterPage from "./pages/auth/Register.jsx";
import {AuthLayout,ForgetPasswordPage,LoginPage,RegisterPage, ResetPasswordPage,VerifyOTPPage,PageNotFound} from './pages/auth'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forget-password" element={<ForgetPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify-otp" element={<VerifyOTPPage/>} />

        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
