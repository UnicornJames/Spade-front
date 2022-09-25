import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import { socket } from "./socket";

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
  // const [seriesa, setSeriesa] = useState([]);
  // const [seriesb, setSeriesb] = useState([]);
  // const [seriesc, setSeriesc] = useState([]);
  // const [mindate, setMindate] = useState(0);
  // const [maxdate, setMaxdate] = useState(0);
  // var DATA: any = [];
  
  // useEffect(() => {
    
  //   socket.on("getchartdata", (data) => {
  //     const seriesOne: any = [];
  //     const seriesTwo: any = [];
  //     const seriesThree: any = [];
  //     data.map((item: any, key: number) => {
  //       seriesOne.push({ x: item.timestamp, y: item.total[0] });
  //       seriesTwo.push({ x: item.timestamp, y: item.total[1] });
  //       seriesThree.push({ x: item.timestamp, y: item.total[2] });
  //     });
  //     setSeriesa(seriesOne);
  //     setSeriesb(seriesTwo);
  //     setSeriesc(seriesThree);
  //     setMindate(seriesOne[0].x);
  //     setMaxdate(seriesOne[seriesOne.length - 1].x);
  //   });
  //   console.log("----------",seriesa);
    
  //   socket.emit("getchartdata");
    
  //   return () => {
  //     socket.off("getchartdata");
  //   };
  // });
  
  // DATA = [seriesa, seriesb, seriesc, mindate, maxdate];

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
