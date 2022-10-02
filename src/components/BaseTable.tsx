import {useState, useEffect} from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { socket } from "../socket";
import { currencyAbbr } from "../utils/currency";

const BaseTable = () => {
    const [assets, setAssets] = useState<any[]>([]);
    const [reserve, setReserve] = useState<any>(null);

    useEffect(() => {
        loadAssets();
    
        let rotationInterval = setInterval (() => {
          loadAssets();
        }, 60000) //get new data per 1 mins
        
        // socket.on("reserve", (data) => {
        //   setReserve(data);
        // });
    
        // socket.emit("reserve");
        return () => {
          // socket.off("reserve");
          clearInterval(rotationInterval);
        };
      }, []);
     
      const loadAssets = async () => {
        const { data } = await axios.get(API_URL + "/assets");
        const finalData: any[] = [];
        data.forEach((v: any) => {
          finalData.push(v);
          // v.sub_assets.forEach((z: any, i: number) => {
            //   finalData.push({ ...z, _id: `${v._id}-${i}`, child: true });
            // });
          });
        setAssets(finalData);
      };
      
      const percentStyle = (value: number) => {
        return value.toFixed(2);
      };

    return(
        <div>
            <table className="w-full hidden lg:table">
                <thead className="text-xs text-left text-gray-500 font-thin">
                    <tr>
                    <th className="pl-8 pb-2">
                        Asset
                        {/* <Tippy interactive content={tooltip.asset}>
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
                        </Tippy> */}
                    </th>
                    <th>
                        Total collateral
                        {/* <Tippy interactive content={tooltip.total_collateral}>
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
                        </Tippy> */}
                    </th>
                    <th>
                        Loan to Value
                        {/* <Tippy interactive content={tooltip.loan_to_value}>
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
                        </Tippy> */}
                    </th>
                    <th>
                        Total borrowed
                        {/* <Tippy interactive content={tooltip.total_borrowed}>
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
                        </Tippy> */}
                    </th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset: any, key: number) => (
                    <tr
                        className={`border-t hover:bg-gray-100 ${
                        asset.child ? "hidden" : "font-medium"
                        }`}
                        key={asset._id}
                    >
                        <td className={`pl-8 py-2 flex items-center ${asset.child ? "pl-10" : ""}`}>
                          <img src={`marketsymbol/${key}.png`} className="w-[24px] mr-2" />
                          {asset.name}
                        </td>
                        <td>{currencyAbbr(asset.total_collateral)}</td>
                        <td>{percentStyle(asset.loan_to_value)}%</td>
                        <td>
                        {/* {currencyAbbr(asset.total_borrowed)} */}
                        {currencyAbbr(
                            (asset.total_collateral / 100) * asset.loan_to_value,
                        )}
                        </td>
                        <td>
                            <Link to={"/markets/overview/" + asset._id}>
                                <button className="px-2 py-1 border bg-gray-100 rounded text-sm cursor-pointer">
                                Details
                                </button>
                            </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        <div className="lg:hidden">
          {assets.map((asset: any) => (
            <div key={asset._id} className="border-t p-4">
              <div className="w-full">
                <p className="font-bold text-center md:text-left">{asset.name}</p>
              </div>
              <div className="w-full md:text-base sm:text-sm text-xs flex justify-bewteen my-4">
                <div className="w-10/12">
                  <p className="text-left">
                    Total collateral
                  </p>
                </div>
                <div className="w-5/12 text-right">
                  <p className="text-right">
                    {currencyAbbr(asset.total_collateral)}
                  </p>
                </div>
              </div>
              <div className="w-full md:text-base sm:text-sm text-xs flex justify-bewteen my-4">
                <div className="w-10/12">
                  <p className="text-left">
                    Loan to Value
                  </p>
                </div>
                <div className="w-5/12 text-right">
                  <p className="text-right">
                    {percentStyle(asset.loan_to_value)}%
                  </p>
                </div>
              </div>
              <div className="w-full md:text-base sm:text-sm text-xs flex justify-bewteen my-4">
                <div className="w-10/12">
                  <p className="text-left">
                    Total borrowed
                  </p>
                </div>
                <div className="w-5/12 text-right">
                  <p className="text-right">
                    {currencyAbbr(
                      (asset.total_collateral / 100) * asset.loan_to_value
                    )}
                  </p>
                </div>
              </div>
              <div className={asset.child ? "hidden" : "block"}>
                <div className={`w-full flex my-4`}>
                  <Link to={"/markets/overview/" + asset._id} className="w-full">
                    <button className="p-2 border bg-gray-100 rounded text-sm w-full cursor-pointer">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
    )
}

export default BaseTable