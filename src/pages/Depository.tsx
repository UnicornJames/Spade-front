import Tippy from "@tippyjs/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config";
import { socket } from "../socket";
import { currency } from "../utils/currency";

const Depository = () => {
  const [depositories, setDepositories] = useState<any[]>([]);
  const [active, setActive] = useState<any>(null);
  const [audits, setAudits] = useState<any[]>([]);
  const [reserve, setReserve] = useState<any>(null);

  const currentItems = useMemo(
    () => depositories.find((v) => v.name == active)?.items || [],
    [depositories, active]
  );

  const totalAssets = useMemo(() => {
    return audits.reduce((sum, v) => sum + v.value, 0);
  }, [audits]);

  useEffect(() => {
    socket.on("reserve", (data) => {
      setReserve(data);
    });

    socket.emit("reserve");

    loadDepositories();
    loadAudits();

    return () => {
      socket.off("reserve");
    };
  }, []);

  const loadDepositories = async () => {
    const { data } = await axios.get(API_URL + "/depositories");
    setActive(data[0].name);
    setDepositories(data);
  };

  const loadAudits = async () => {
    const { data } = await axios.get(API_URL + "/audits");
    setAudits(data);
  };

  const percentageTemplate = (total: number, value: number) => {
    const percent = ((total - value) / total) * 100;
    return (
      <>
        <div className={`w-full bg-[#b5b5b5] rounded h-1`}>
          <div
            className={`bg-[#292D3C] h-1 rounded`}
            style={{ width: `${percent > 100 ? 100 : percent}%` }}
          ></div>
        </div>
      </>
    );
  };

  if (!depositories.length || !audits.length || !reserve) {
    return <></>;
  }

  return (
    <div className="bg-split-white-black-small px-4 md:p-12 xl:px-64">
      <div className="xl:flex">
        <div className="md:w-8/12 xl:w-6/12  text-left text-white pt-10 md:pt-2 cursor-pointer relative">
          <span className="ml-2 text-xl md:text-2xl lg:text-4xl font-bold">
            Depository
          </span>
          <p className="ml-2 text-left text-white text-base mt-2">
            Last verified at 07/09/2022 02:05:45 PM UTC
          </p>
        </div>
        <div className="w-full xl:w-6/12 flex mt-6 xl:mt-0 justify-end pr-10">
          <div className="md:w-6/12">
            <p className="text-gray-400 text-md text-right">Total assets</p>
            <p className="text-gray-200 text-xl text-right">
              {currency(totalAssets)}
            </p>
          </div>
          {/* <div className="md:w-6/12">
            <p className="text-gray-400 text-sm text-right">
              Total liabilities
            </p>
            <p className="text-gray-200 text-xl text-right">
              {currency(reserve[1].total)}
            </p>
          </div> */}
        </div>
      </div>
      <p className="mb-10 mt-6 p-2"></p>
      <div className="rounded-md shadow-md bg-white">
        <ul className="nav nav-tabs nav-justified flex flex-col md:flex-row flex-wrap list-none pl-0 mb-4">
          {depositories.map((v) => (
            <li className="nav-item flex-grow text-center" key={v._id}>
              <span
                onClick={() => setActive(v.name)}
                className={`nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 px-6 py-3 my-2 hover:bg-gray-100 cursor-pointer ${
                  active == v.name ? "active" : ""
                }`}
              >
                {v.name}
                <Tippy interactive content={v.tooltip}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 relative -top-[1px] inline cursor-pointer"
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
              </span>
            </li>
          ))}
        </ul>
        <div className="md:grid grid-cols-2">
          {currentItems.map((v: any, i: number) => (
            <div key={i} className="px-6 pb-4">
              <div className="border rounded-md px-1 py-1">
                <div className="w-full pl-1">
                  <span className="text-xs ">{v.name}</span>
                </div>
                <div className="w-full bg-[#F9FCFE] py-1 px-1 flex items-center rounded-r-md">
                  {percentageTemplate(v.total, v.less)}
                </div>
              </div>
              <div className="flex my-4 px-1">
                <div className="w-1/2">
                  <p className="text-xs text-[#232323]">{v.total_text}</p>
                </div>
                <div className="w-1/2">
                  <p className="text-xs text-[#586871] text-right">
                    {currency(v.total)}
                  </p>
                </div>
              </div>
              <div className="flex my-4 px-1">
                <div className="w-1/2">
                  <p className="text-xs text-[#232323]">{v.less_text}</p>
                </div>
                <div className="w-1/2">
                  <p className="text-xs text-[#586871] text-right">
                    -{currency(v.less)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Depository;
