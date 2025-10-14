import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import ThemeProvider from "./contexts/ThemeContext/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
