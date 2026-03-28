import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { axiosInstance } from "./lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { check } from "./lib/utils";
import { checkAuth, connectSocket } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    (async () => {
      try {
        const res = await check();

        if (res) dispatch(checkAuth(res));
        dispatch(connectSocket());
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <HomePage />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <HomePage />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <LoginPage />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <SettingsPage /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
