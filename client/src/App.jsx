import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import NotFound from "./pages/error/NotFound.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Home from "./pages/landing/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import UpdateProfile from "./pages/profile/UpdateProfile.jsx";
import Chat from "./pages/chat/Chat.jsx";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/landing/LandingPage.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ChatWithNotes from "./pages/chat/ChatWithNotes.jsx";

function App() {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const hideLayout = ["login", "signup"].includes(pathname);
  return (
    <>
      <ToastContainer />

      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/chatWithNotes/:id" element={<ChatWithNotes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
