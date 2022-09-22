import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import "../index.css";

const BTCchart: React.FC = () => {
  const [timestamp, setTimestamp] = useState("1year");
  const [seriesarr, setSeriesarr] = useState([]);
  const series = [
    {
      name: "Price",
      data: seriesarr,
    },
  ];
  const options: ApexOptions = {
    title: {
      text: "",
      align: "center",
    },
    chart: {
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
        format: "dd/MM",
        formatter: function (value: any, timestamp: number) {
          return moment(timestamp * 1000).format("MM DD yyyy HH:mm");
        },
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    colors: ["#0C6CF2"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: true,
        gradientToColors: ["#0C6CF2"],
        opacityFrom: 1,
        opacityTo: 1,
        type: "vertical",
        stops: [0, 30],
      },
    },
  };

  useEffect(() => {
    getchartdata();
  }, [timestamp]);

  const getchartdata = async () => {
    await fetch(
      "https://api.blockchain.info/charts/market-price?timespan=" +
        `${timestamp}` +
        "&sampled=true&metadata=false&cors=true&format=json",
    )
      .then((response) => response.json())
      .then((data) => {
        var datas = data.values;
        setSeriesarr(datas);
      });
  };

  const ChartDays = ["30days", "60days", "180days", "1year", "3years", "all"];

  return (
    <div className="w-full text-center">
      <div id="chart" className="flex w-full justify-center">
        <Chart
          options={options}
          series={series}
          type="line"
          className="chartside w-8/12"
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-8/12 lg:w-6/12 2xl:w-4/12 mt-20 text-md">
          {ChartDays.map((chartday, index) => {
            return (
              <button
                value={chartday}
                className={`py-2 text-xs sm:text-sm md:text-base w-2/12 border-2 active:bg-green-800 ${
                  index === 0 && "rounded-l-xl"
                } ${index === ChartDays.length - 1 && "rounded-r-xl"}`}
                onClick={() => setTimestamp(chartday)}
              >
                {chartday}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BTCchart;
