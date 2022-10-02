import Tippy from "@tippyjs/react";
import React from "react";
import Preloader from "../components/Preloader";

const Status = () => {
  const services = [
    "Terminal",
    "Rebalance",
    "Data Processing Pipeline",
    "Market Tracker",
    "Reserve Controller",
    "Streamline Conversion",
    "Proprietary AI",
  ];

  return (
    <div className="bg-split-white-black px-4 md:p-12 xl:px-64">
      <h1 className="text-left text-white text-2xl lg:text-4xl font-bold">
        Status
      </h1>
      <p className="text-left text-white text-base mb-12 mt-6 p-2 rounded-md bg-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        All Systems Operational
      </p>
      <div className="rounded-md shadow-md bg-white">
        <div className="md:grid grid-cols-2">
          {services.map((v: string, i: number) => (
            <div
              className={`border-b px-4 py-4 ${
                i % 2 == 0 ? "md:border-r" : ""
              }`}
              key={i}
            >
              <div className="flex items-center">
                <div className="w-3/4">
                  <p className="text-lg font-medium text-[#2A2D3C]">
                    {v}
                  </p>
                  <p className="text-sm text-gray-500">Normal</p>
                </div>
                <div className="w-1/4">
                  <Tippy interactive content="Operational">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 inline float-right text-green-600 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Tippy>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;
