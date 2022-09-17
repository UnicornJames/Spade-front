import { useEffect, useState } from "react";
import { socket } from "../socket";
import { currency } from "../utils/currency";

const Statistics = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    socket.on("statistics", (data) => {
      setStats(data);
    });

    socket.emit("statistics");

    return () => {
      socket.off("statistics");
    };
  }, []);

  if (!stats) {
    return <></>;
  }

  return (
    <div className="bg-[#292E41] p-4 w-full rounded-md">
      <p className="text-center text-lg font-bold text-white mb-4">
        Spade Statistics
      </p>
      <div className="grid gap-10 md:grid-cols-3 xl:px-16">
        <div>
          <p className="text-gray-400 md:text-center mb-2 text-sm">
            24h Volume
          </p>
          <p className="text-white md:text-center text-md">
            {currency(stats["24h_volume"])}
          </p>
        </div>
        <div>
          <p className="text-gray-400 md:text-center mb-2 text-sm">
            30d Volume
          </p>
          <p className="text-white md:text-center text-md">
            {currency(stats["30d_volume"])}
          </p>
        </div>
        <div>
          <p className="text-gray-400 md:text-center mb-2 text-sm">
            24h Rebalancing
          </p>
          <p className="text-white md:text-center text-md">
            {currency(stats["24h_rebalancing"])}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
