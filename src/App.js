import { lazy, useEffect, Suspense, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveWrapper from "./app/ResponsiveWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  setDimension,
  setIsLogin,
  setIsOverlay,
  setSecondDrawerOpen,
  setServices,
  setSnakeBarContent,
} from "./action";
import Home from "./components/Home";
import RouteTemplate from "./app/RouteTemplate";
import ChatButton from "./components/ChatButton";
import { BannerImgs } from "./data";
import { Helmet } from "react-helmet";
import AdminTemplate from "./Admin/AdminTemplate";
import CustomerTemplate from "./Customer/CustomerTemplate";
import ProtectedRoute from "./app/ProtectedRouting";

const UnknownRoute = lazy(() => import("./app/UnknownRoute"));
const AboutUsPage = lazy(() => import("./components/AboutUs"));
const TermsPage = lazy(() => import("./components/Terms"));
const PrivacyPolicyPage = lazy(() => import("./components/Privacy"));
const RefundPolicyPage = lazy(() => import("./components/RefundPolicy"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));

// ------------------------------------------
const AdminLogin = lazy(() => import("./Admin/Login"));
const AdminDashboard = lazy(() => import("./Admin/Dashboard"));
const Hotels = lazy(() => import("./Admin/Hotels"));
const AdminReports = lazy(() => import("./Admin/Reports"));
const CustomerReports = lazy(() => import("./Customer/Reports"));


const CustomerLogin = lazy(() => import("./Customer/Login"));
// const CustomerDashboard = lazy(() => import("./Customer/Dashboard"));
const CustomerHotels = lazy(() => import("./Customer/Hotels"));

const Fallback = () => {
  return (
    <>
      <main className="full-page">
        <div className="loader"></div>
      </main>
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const [isOverlay, snakeBarContent] = useSelector((state) => [
    state.isOverlay,
    state.snakeBarContent,
  ]);
  const snakeBarTimeoutRef = useRef(null);

  useEffect(() => {
    if (snakeBarContent !== "") {
      clearTimeout(snakeBarTimeoutRef.current);
      snakeBarTimeoutRef.current = setTimeout(() => {
        dispatch(setSnakeBarContent(""));
      }, 2000);
    }
  }, [snakeBarContent]);

  const onResize = (data) => {
    dispatch(setDimension(data));
  };

  return (
    <div className="app">
      <Helmet>
        {BannerImgs.map((src, i) => (
          <link key={i} rel="preload" as="image" href={src} />
        ))}
      </Helmet>
      <ResponsiveWrapper
        breakpoints={{
          small: [0, 639],
          medium: [640, 1023],
          large: [1024, "~"],
        }}
        onResize={onResize}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RouteTemplate className="home-page-container">
                  <Home />
                </RouteTemplate>
              }
            />

            <Route
              path="*"
              element={
                <Suspense fallback={<Fallback />}>
                  <UnknownRoute />
                </Suspense>
              }
            />

            <Route
              path="/about"
              element={
                <RouteTemplate className="about-page-container w-100 h-100 position-relative">
                  <Suspense fallback={<Fallback />}>
                    <AboutUsPage />
                  </Suspense>
                </RouteTemplate>
              }
            />

            <Route
              path="/coming-soon"
              element={
                <RouteTemplate className="coming-soon-page-container w-100 h-100 position-relative">
                  <Suspense fallback={<Fallback />}>
                    <ComingSoon />
                  </Suspense>
                </RouteTemplate>
              }
            />

            <Route
              path="/terms"
              element={
                <RouteTemplate className="terms-page-container w-100 h-100 position-relative">
                  <Suspense fallback={<Fallback />}>
                    <TermsPage />
                  </Suspense>
                </RouteTemplate>
              }
            />

            <Route
              path="/privacy-policy"
              element={
                <RouteTemplate className="terms-page-container w-100 h-100 position-relative">
                  <Suspense fallback={<Fallback />}>
                    <PrivacyPolicyPage />
                  </Suspense>
                </RouteTemplate>
              }
            />

            <Route
              path="/refund-policy"
              element={
                <RouteTemplate className="terms-page-container w-100 h-100 position-relative">
                  <Suspense fallback={<Fallback />}>
                    <RefundPolicyPage />
                  </Suspense>
                </RouteTemplate>
              }
            />

            {/* =-----------------Admin----------------------------
             */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<Fallback />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminTemplate>
                    <Suspense fallback={<Fallback />}>
                      <AdminDashboard />
                    </Suspense>
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/hotels"
              element={
                <ProtectedRoute>
                  <AdminTemplate>
                    <Suspense fallback={<Fallback />}>
                      <Hotels />
                    </Suspense>
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute>
                  <AdminTemplate>
                    <Suspense fallback={<Fallback />}>
                      <AdminReports />
                    </Suspense>
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

               <Route
              path="/customer/reports"
              element={
                <ProtectedRoute>
                  <CustomerTemplate>
                    <Suspense fallback={<Fallback />}>
                      <CustomerReports />
                    </Suspense>
                  </CustomerTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/login"
              element={
                <Suspense fallback={<Fallback />}>
                  <CustomerLogin />
                </Suspense>
              }
            />

            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute>
                  <CustomerTemplate>
                    <Suspense fallback={<Fallback />}>
                      <AdminDashboard />
                    </Suspense>
                  </CustomerTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/hotels"
              element={
                <ProtectedRoute>
                  <CustomerTemplate>
                    <Suspense fallback={<Fallback />}>
                      <CustomerHotels />
                    </Suspense>
                  </CustomerTemplate>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ResponsiveWrapper>
      {isOverlay && (
        <div
          className="overlay"
          onClick={() => {
            const navDrawer = document.querySelector(".mobile-drawer");
            console.log("navDrawer", navDrawer);

            if (navDrawer.classList.contains("show")) {
              navDrawer.classList.remove("show");
              dispatch(setIsOverlay(false));
              document.body.style.overflowY = "auto";
            }
          }}
        ></div>
      )}

      <div
        className={`snack-bar-wrapper ${
          snakeBarContent !== "" ? "snack-bar-visible" : ""
        }`}
      >
        <p className="font-bold font-14 text-white">
          {snakeBarContent || "You are required to Login first"}
        </p>
        <button
          className="ms-4 me-2 position-relative"
          onClick={() => dispatch(setSnakeBarContent(""))}
        >
          <div className="snackbar-cross snackbar-cross-1"></div>
          <div className="snackbar-cross snackbar-cross-2"></div>
        </button>
      </div>

      {!window.location.href.includes("admin") &&
        !window.location.href.includes("customer") && <ChatButton />}
    </div>
  );
}

export default App;
