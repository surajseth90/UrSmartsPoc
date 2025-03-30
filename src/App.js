import { lazy, useEffect, Suspense, useRef } from "react";
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

const UnknownRoute = lazy(() => import("./app/UnknownRoute"));
const AboutUsPage = lazy(() => import("./components/AboutUs"));

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
          </Routes>
        </BrowserRouter>
      </ResponsiveWrapper>
      {isOverlay && (
        <div
          className="overlay"
          onClick={() => {
            const navDrawer = document.querySelector(".header-right-container");
            if (navDrawer.classList.contains("show")) {
              navDrawer.classList.remove("show");
              dispatch(setIsOverlay(false));
              dispatch(setSecondDrawerOpen(null));
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
    </div>
  );
}

export default App;
