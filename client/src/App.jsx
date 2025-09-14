import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "./components/ui/Toast.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";

// Lazy load route components
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Signup = lazy(() => import("./pages/auth/Signup.jsx"));
const NotFound = lazy(() => import("./pages/error/NotFound.jsx"));
const Home = lazy(() => import("./pages/landing/Home.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.jsx"));
const UpdateProfile = lazy(() => import("./pages/profile/UpdateProfile.jsx"));
const Chat = lazy(() => import("./pages/chat/Chat.jsx"));
const LandingPage = lazy(() => import("./pages/landing/LandingPage.jsx"));
const ChatWithNotes = lazy(() => import("./pages/chat/ChatWithNotes.jsx"));

function App() {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const hideLayout = ["login", "signup"].includes(pathname);
  return (
    <>
      <ToastContainer
        position={toastConfig.position}
        autoClose={toastConfig.autoClose}
        hideProgressBar={toastConfig.hideProgressBar}
        newestOnTop={toastConfig.newestOnTop}
        closeOnClick={toastConfig.closeOnClick}
        rtl={toastConfig.rtl}
        pauseOnFocusLoss={toastConfig.pauseOnFocusLoss}
        draggable={toastConfig.draggable}
        pauseOnHover={toastConfig.pauseOnHover}
        className="z-50"
      />

      {!hideLayout && <Header />}
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
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
      </Suspense>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
