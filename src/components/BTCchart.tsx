import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import "../index.css";

const BTCchart:React.FC = () => {
  const [timestamp, setTimestamp] = useState("1year");
  const [seriesarr, setSeriesarr] = useState([]);
  const series = [
    {
      name: "Price",
      data: seriesarr,
    },
  ];
  const options = {
    title: {
      text: "",
      align: "center",
    },
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      rotate: 0,
      rotateAlways: false,
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
        <div className="w-4/12 mt-20 text-md">
          <button
            value={"30days"}
            className={
              "py-2 sm:text-sm w-2/12 border-2 rounded-l-xl md:text-xl"
            }
            onClick={() => setTimestamp("30days")}
          >
            30days
          </button>
          <button
            value={"60days"}
            className={"py-2 sm:text-sm w-2/12 border-2 md:text-xl"}
            onClick={() => setTimestamp("60days")}
          >
            60days
          </button>
          <button
            value={"180days"}
            className={"py-2 sm:text-sm w-2/12 border-2 md:text-xl"}
            onClick={() => setTimestamp("180days")}
          >
            180days
          </button>
          <button
            value={"1year"}
            className={"py-2 sm:text-sm w-2/12 border-2 md:text-xl"}
            onClick={() => setTimestamp("1year")}
          >
            1year
          </button>
          <button
            value={"3years"}
            className={"py-2 sm:text-sm w-2/12 border-2 md:text-xl"}
            onClick={() => setTimestamp("3years")}
          >
            3years
          </button>
          <button
            value={"all"}
            className={
              "py-2 sm:text-sm w-2/12 border-2 rounded-r-xl md:text-xl"
            }
            onClick={() => setTimestamp("all")}
          >
            all
          </button>
        </div>
      </div>
    </div>
  );
};

export default BTCchart;
