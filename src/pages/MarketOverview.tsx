import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config";
import { currencyAbbr } from "../utils/currency";

const MarketOverview = () => {
  let { asset_id } = useParams();

  const [asset, setAsset] = useState<any>(null);

  useEffect(() => {
    loadAsset();
  }, []);

  const loadAsset = async () => {
    const { data } = await axios.get(API_URL + "/asset/" + asset_id);
    setAsset(data);
  };

  if (!asset) {
    return <></>;
  }

  return (
    <div className="bg-split-white-black px-4 md:p-12 lg:p-14 xl:px-24">
      <div className="text-left text-white font-bold pt-10 md:pt-2">
        <Link to="/markets">
          <button className="p-2 border bg-gray-800 border-gray-600 rounded text-sm cursor-pointer mr-4 mb-6 md:mb-0 block md:inline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </Link>
      </div>
      <div className="w-full flex mb-6 mt-4">
        <div className="w-full flex">
          <p className="text-white font-bold text-xl pl-2 md:pl-0 relative top-1">
            {asset.name}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 md:w-8/12">
        <div className="mb-2">
          <p className="text-gray-400 text-xs md:text-sm">Reserve Size</p>
          <p className="text-gray-200 text-md md:text-lg">
            {currencyAbbr(asset.total_collateral + (asset.total_collateral / 100) * asset.loan_to_value)}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-gray-400 text-xs md:text-sm">
            Available liquidity
          </p>
          <p className="text-gray-200 text-md md:text-lg">
            {currencyAbbr(asset.available_liquidity)}
          </p>
        </div>
      </div>
      <div className="rounded-md shadow-md bg-white p-1 mt-4 w-full">
        <p className="text-xl mt-4 mb-10 mx-6 text-left">
          Reserve status & configuration
        </p>
        <div className="md:flex m-6">
          <div className="w-full md:w-3/12 items-center">
            <p className="text-sm md:text-base">Supply Info</p>
          </div>
          <div className="w-full md:w-3/12 flex items-center my-2 justify-between md:block" >
            <p className="text-gray-600 text-xs md:text-sm">
              Supply Flexible APY
            </p>
            <p className="text-gray-900 text-sm md:text-md text-right md:text-left">
              {asset.supply_flexible_apy || "N/A"}
            </p>
          </div>
          <div className="w-full md:w-3/12 flex items-center my-2 justify-between md:block">
            <p className="text-gray-600 text-xs md:text-sm">
              Supply Fixed Term APY
            </p>
            <p className="text-gray-900 text-sm md:text-md text-right md:text-left">
              {asset.supply_fixed_term_apy || "N/A"}
            </p>
          </div>
        </div>
        <hr />
        <div className="md:flex m-6">
          <div className="w-3/12 flex items-center">
            <p className="text-sm md:text-base">Borrow Info</p>
          </div>
          <div className="md:w-3/12 my-2 flex justify-between md:block">
            <p className="text-gray-600 text-xs md:text-sm">Total borrowed</p>
            <p className="text-gray-900 text-sm md:text-md md:text-left text-right">
              {currencyAbbr(asset.total_borrowed)}
            </p>
          </div>
          <div className="md:w-3/12 my-2 flex justify-between md:block">
            <p className="text-gray-600 text-xs md:text-sm">
              Borrow Flexible APR
            </p>
            <p className="ttext-gray-900 text-sm md:text-md md:text-left text-right">
              {asset.borrow_flexible_apr || "N/A"}
            </p>
          </div>
          <div className="md:w-3/12 my-2 flex justify-between md:block">
            <p className="text-gray-600 text-xs md:text-sm">
              Borrow Fixed Term APR
            </p>
            <p className="text-gray-900 text-sm md:text-md md:text-left text-right">
              {asset.borrow_fixed_term_apr || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
