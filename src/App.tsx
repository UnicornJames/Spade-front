import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

const Reserve = lazy(() => import("./pages/Reserve"));
const Markets = lazy(() => import("./pages/Markets"));
const MarketOverview = lazy(() => import("./pages/MarketOverview"));
const Borrow = lazy(() => import("./pages/Borrow"));
const Terminal = lazy(() => import("./pages/Terminal"));
const Depository = lazy(() => import("./pages/Depository"));
const Audits = lazy(() => import("./pages/Audits"));
const Status = lazy(() => import("./pages/Status"));
const Signin = lazy(() => import("./pages/Signin"));
const Partners = lazy(() => import("./pages/Partner"));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Reserve />
            </Suspense>
          }
        />
        <Route
          path="markets"
          element={
            <Suspense>
              <Markets />
            </Suspense>
          }
        />
        <Route
          path="markets/overview/:asset_id"
          element={
            <Suspense>
              <MarketOverview />
            </Suspense>
          }
        />
        <Route
          path="borrow"
          element={
            <Suspense>
              <Borrow />
            </Suspense>
          }
        />
        <Route
          path="status"
          element={
            <Suspense>
              <Status />
            </Suspense>
          }
        />
        <Route
          path="audits"
          element={
            <Suspense>
              <Audits />
            </Suspense>
          }
        />
        <Route
          path="depository"
          element={
            <Suspense>
              <Depository />
            </Suspense>
          }
        />
        <Route
          path="terminal"
          element={
            <Suspense>
              <Terminal />
            </Suspense>
          }
        />
        <Route
          path="signin"
          element={
            <Suspense>
              <Signin />
            </Suspense>
          }
        />
        <Route
          path="partners"
          element={
            <Suspense>
              <Partners />
            </Suspense>
          }
        />
      </Routes>

      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
