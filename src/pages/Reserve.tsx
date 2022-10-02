import Tippy from "@tippyjs/react";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { socket } from "../socket";
import { currency, currencyAbbr } from "../utils/currency";
import Bankchart from "../components/Bankchart";
import Community from "../components/Community";
import EcoSystem from "../components/EcoSystem";
import Preloader from "../components/Preloader";
import MarketTable from "../components/MarketTable";

const Reserve = () => {
  const [reserve, setReserve] = useState<any>(null);
  const [chartdata, setChartdata] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [cash, setCash] = useState();
  const [high, setHigh] = useState();
  const [borrow, setBorrow] = useState();
  const [servertime, setServerTime] = useState();

  useEffect(() => {
    socket.on("reserve", (data) => {
      setCash(data[0].assets[0].total);
      setHigh(data[0].assets[1].total);
      setBorrow(data[1].total);
      setReserve([data[0], data[1], data[2]]);
      setServerTime(data[3]);
    });
    
    socket.on("statistics", (data) => {
      setStats(data);
    });
    
    socket.on("getchartdata", (data) => {
      setChartdata(data);
    });

    socket.emit("getchartdata");
    socket.emit("reserve");
    socket.emit("statistics");

    return () => {
      socket.off("reserve");
      socket.off("statistics");
      socket.off("getchartdata");
    };

  }, [chartdata]);

  const percentageTemplate = (total: number, color: string, item: any) => {
    const percent = (item.total / total) * 100;
    return (
      <>
        <p className="text-xs text-gray-400 font-semibold mb-2">
          {item.title}
          <span className={`text-${color}-400 float-right`}>
            {percent % 1 !== 0 ? percent.toFixed(2) : percent}%
          </span>
        </p>
        <div className={`w-full bg-${color}-100 rounded h-1`}>
          <div
            className={`bg-${color}-400 h-1 rounded`}
            style={{ width: `${percent > 100 ? 100 : percent}%` }}
          ></div>
        </div>
      </>
    );
  };

  const openDoc = () => {
     window.open("/public/Governanceintheblockchaineconomyaframeworkandresearchagenda.pdf","_blank");
  }

  if (!reserve || !stats) {
    return <Preloader />;
  }

  return (
    <div className="bg-split-white-black px-4 md:p-12 lg:p-14 xl:px-24">
      <div className="md:flex">
        <div className="md:w-6/12 flex justify-center flex-col mb-5 md:mr-3 md:mb-16">
          <h1 className="text-left text-white text-4xl font-bold">
            Spade Smart Reserve
          </h1>
          <p className="text-left text-white text-base mt-2">
            Last recorded at {stats.last_recorded}
          </p>
        </div>
        <div className="sm:w-6/12 flex items-center flex-col mb-5 sm:mr-3 md:mb-16">
          <div className="rounded-md border shadow-md bg-white w-full">
            <div className="md:grid grid-cols-1">
              <div className={`p-4`}>
                <div className="flex justify-between">
                  <div className="md:w-9/12 xs:8/12">
                    <p className="flex text-lg font-medium hidden md:block text-[#2A2D3C]">
                      PriceWaterhouseCoopers Audit
                    </p>
                    <p className="flex text-lg font-medium md:hidden text-[#2A2D3C]">
                      PwC Audit
                    </p>
                    <p className="text-sm text-gray-500">11th September 2022</p>
                  </div>
                  <div className="flex lg:w-2/12 md:w-3/12 xs:4/12 justify-between items-center">
                    <div className="w-6/12">
                      <a onClick={() => openDoc()}>
                        <Tippy interactive content="View">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 inline float-right cursor-pointer text-[#2468EF]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Tippy>
                      </a>
                    </div>
                    <div className="w-6/12">
                      <a href="/public/Governanceintheblockchaineconomyaframeworkandresearchagenda.pdf" download >
                        <Tippy interactive content="Download">
                          <img
                            src="download.png"
                            className="h-7 w-7 inline float-right cursor-pointer"
                            alt=""
                          />
                        </Tippy>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {reserve.map((value: any, index: number) => (
          <div key={value._id} className="rounded shadow-md bg-white mx-1 py-2">
            <p className="text-lg font-semibold my-4 mx-6 text-left">
              {value.title}
              {index == 0 && (
                <>
                  {value.is_verified ? (
                    <Tippy
                      interactive
                      content={
                        <>
                          <p>This figure was last updated at</p>
                          <p>{stats.last_recorded}</p>
                        </>
                      }
                    >
                      <img
                        src="verified.png"
                        className="h-4 w-4 relative -top-[1px] inline cursor-pointer ml-2"
                      />
                    </Tippy>
                  ) : (
                    <Tippy
                      interactive
                      content={
                        <>
                          <p>This figure was last updated at</p>
                          <p>{stats.stablecoin_last_recorded}</p>
                        </>
                      }
                    >
                      <img
                        src="unverified.png"
                        className="h-[1.1rem] w-[1.1rem] relative -top-[1px] inline cursor-pointer ml-2"
                      />
                    </Tippy>
                  )}
                </>
              )}
              <Tippy interactive content={value.tooltip}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 inline relative cursor-pointer -top-[1px]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Tippy>
            </p>
            <hr />
            <p className="text-xl font-semibold mt-4 mx-6">
              {currency(value.total)}
              <span
                className={`text-base font-medium ml-2 ${
                  value.change < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {value.change}%
              </span>
            </p>
            {value.multi_level_assets
              ? value.assets.map((asset: any, index: number) => (
                  <div key={index} className="my-4 mx-6">
                    <p className="text-md font-bold mt-4 mb-2">{asset.title}</p>

                    {asset.items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="my-4">
                        {percentageTemplate(value.total, value.color, item)}
                        {/* {value.total}+++
                        {item.total}--- */}
                      </div>
                    ))}
                  </div>
                ))
              : value.assets.map((asset: any, index: number) => (
                  <div key={index} className="my-4 mx-6">
                    {percentageTemplate(value.total, value.color, asset)}
                    {/* {value.total}=====
                    {asset.total}????? */}
                  </div>
                ))}
            <br />
            <hr />
            <div className="my-4 mx-6 text-center">
              <p className={`text-gray-400 text-xs font-semibold mb-2`}>
                {value.bottom_label}
                <Tippy interactive content={value.bottom_tooltip}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 inline relative cursor-pointer -top-[1px]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Tippy>
              </p>
              <p className={`text-lg font-medium`}>{value.bottom_value}</p>
            </div>
          </div>
        ))}
      </div>
      <div id="table" className="w-full md:py-10 py-5 shadow-xl mb-10">
        <MarketTable />
      </div>
      <div id="list" className="w-full md:py-10 py-5 mt-10 pb-10">
        <Community />
        {/* <EcoSystem /> */}
      </div>
      <div id="Chart" className="w-full md:py-10 py-5 shadow-xl mb-10">
          <Bankchart
            cash={cash}
            high={high}
            borrow={borrow}
            chartdata={chartdata && chartdata}
            servertime={servertime}
          />
      </div>
    </div>
  );
};

export default Reserve;
