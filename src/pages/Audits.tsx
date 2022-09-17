import Tippy from "@tippyjs/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config";
import { socket } from "../socket";
import { currency } from "../utils/currency";

const Audits = () => {
  const [audits, setAudits] = useState<any[]>([]);
  const [reserve, setReserve] = useState<any>(null);

  useEffect(() => {
    socket.on("reserve", (data) => {
      setReserve(data);
    });

    socket.emit("reserve");

    loadAudits();

    return () => {
      socket.off("reserve");
    };
  }, []);

  const totalAssets = useMemo(() => {
    return audits.reduce((sum, v) => sum + v.value, 0);
  }, [audits]);

  const loadAudits = async () => {
    const { data } = await axios.get(API_URL + "/audits");
    setAudits(data);
  };

  if (!audits.length || !reserve) {
    return <></>;
  }

  return (
    <div className="bg-split-white-black-small px-4 md:p-12 xl:px-64">
      <h1 className="text-left text-white text-2xl lg:text-4xl font-bold">
        Audits & Attestations
      </h1>
      <p className="text-left text-white text-base mt-2">
        Administered by PricewatershouseCoopers on 11th September 2022
      </p>
      <p className="mb-10 mt-6 p-2"></p>
      <div className="rounded-md shadow-md bg-white">
        <p className="px-4 py-4 border-b">Verified audit figures</p>
        <div className="md:grid grid-cols-2 border-b">
          {audits.map((v, i) => (
            <div className={`px-4 py-4`} key={v._id}>
              <div className="flex items-center">
                <div className="w-full">
                  <p className="text-lg font-medium text-[#2A2D3C]">
                    {v.title}
                  </p>
                  <p className="text-lg font-semibold text-gray-500">
                    {currency(v.value)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:grid grid-cols-2">
          <div className="px-4 py-4">
            <div className="flex items-center">
              <div className="w-full">
                <p className="text-sm font-medium text-[#2A2D3C]">
                  Total Assets
                </p>
                <p className="text-md font-semibold text-gray-500">
                  {currency(totalAssets)}
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="flex items-center">
              <div className="w-full">
                <p className="text-sm font-medium text-[#2A2D3C]">
                  Total Liabilities
                </p>
                <p className="text-md font-semibold text-gray-500">
                  {currency(reserve[1].total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md border shadow-md bg-white mt-10">
        <div className="md:grid grid-cols-1">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="w-3/4">
                <p className="text-lg font-medium text-[#2A2D3C]">
                  About our external auditors, PriceWaterhouseCoopers (PwC)
                </p>
                <p className="text-sm text-gray-500">
                  PwC is the second-largest professional services network in the whole world, which audit Spade Enterprise Ltd regularly to verify that the Spade Reserve assets exceed our customer liabilities, and is considered one of the Big Four accounting firms, along with Deloitte, EY, and KPMG. PwC is the auditor for enterprises such as the Bank of America, J.P Morgan & Chase, Blackrock, and many other publicly/private traded companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md border shadow-md bg-white mt-10">
        <div className="md:grid grid-cols-1">
          <div className={`px-4 py-4`}>
            <div className="flex items-center justify-between">
              <div className="w-3/4">
                <p className="text-lg font-medium text-[#2A2D3C]">
                  Audit administered by PriceWaterhouseCoopers (PwC)
                </p>
                <p className="text-sm text-gray-500">
                  11th September 2022
                </p>
              </div>
              <div className="w-1/12 flex items-center">
                <div className="w-6/12">
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
                </div>
                <div className="w-6/12">
                  <Tippy interactive content="Download">
                    <img
                      src="download.png"
                      className="h-7 w-7 inline float-right cursor-pointer"
                      alt=""
                    />
                  </Tippy>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audits;
