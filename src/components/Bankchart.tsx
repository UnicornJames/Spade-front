import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "../index.css";

interface BankchartProps {
  cash: any;
  borrow: any;
  high: any;
  chartdata: any;
  servertime: any;
}

const X: number = 0;

const Bankchart: React.FC<BankchartProps> = ({
  cash,
  borrow,
  high,
  chartdata,
  servertime,
}) => {
  const defaultseries: any = [
    {
      name: "Cash",
      data: [],
    },
    {
      name: "High Quality Liquid Assets (HQLA)",
      data: [],
    },
    {
      name: "Borrowed",
      data: [],
    },
  ];

  const [dataList, setDataList] = useState(defaultseries);
  const [timestamp, setTimestamp] = useState(21600 * 1000);
  const [buttonclicked, setButtonClicked] = useState(2);
  const [tcash, setTcash] = useState(cash);
  const [thigh, setThigh] = useState(high);
  const [tborrow, setTborrow] = useState(borrow);
  const [tservertime, setTservertime] = useState(servertime);
  const [timestyle, setTimestyle] = useState("HH:mm");

  const ChartDays = [
    1800 * 1000,
    3600 * 1000,
    21600 * 1000,
    43200 * 1000,
    86400 * 1000,
    604800 * 1000,
  ];

  const chartButtonName = [
    "30 Minutes",
    "1 Hour",
    "6 Hours",
    "12 Hours",
    "1 Day",
    "All Time",
  ];

  const chartsmallButtonName = ["30m", "1hr", "6h", "12h", "1d", "All"];

  useEffect(() => {
    let seriesCash: any = [];
    let seriesHigh: any = [];
    let seriesBorrow: any = [];

    chartdata &&
      chartdata.map((item: any) => {
        seriesCash.push({ x: item.timestamp, y: item.total[0] });
        seriesHigh.push({ x: item.timestamp, y: item.total[1] });
        seriesBorrow.push({ x: item.timestamp, y: item.total[2] });
      });

    setDataList([
      {
        name: "Cash",
        data: seriesCash,
      },
      {
        name: "High Quality Liquid Assets (HQLA)",
        data: seriesHigh,
      },
      {
        name: "Borrowed",
        data: seriesBorrow,
      },
    ]);
  }, []);

  useEffect(() => {
    setTcash(cash);
    setThigh(high);
    setTborrow(borrow);
  }, [cash, high, borrow]);

  useEffect(() => {
    setTservertime(servertime);
  }, [servertime]);

  useEffect(() => {
    const addDataRandomly = (data: any, value: any) => {
      return [
        ...data,
        {
          x: tservertime,
          y: value,
        },
      ];
    };
    const interval = setInterval(() => {
      setDataList(
        dataList.map((val: any) => {
          if (val.name == "Cash") {
            return {
              name: val.name,
              data: addDataRandomly(val.data, tcash),
            };
          } else if (val.name == "High Quality Liquid Assets (HQLA)") {
            return {
              name: val.name,
              data: addDataRandomly(val.data, thigh),
            };
          } else {
            return {
              name: val.name,
              data: addDataRandomly(val.data, tborrow),
            };
          }
        }),
      );
    }, 5000);

    return () => clearInterval(interval);
  });

  const options: ApexOptions = {
    chart: {
      id: "realtime",
      type: "line",
      width: "100%",
      height: "500px",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 500,
        },
      },
    },
    responsive: [
      {
        breakpoint: 500,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      text: "",
      align: "center",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      range: timestamp,
      title: {
        text: "Date (UTC)",
      },
      labels: {
        format: timestyle,
      },
    },
    yaxis: [
      {
        title: {
          text: "USD",
        },
        tickAmount: 8,
        labels: {
          formatter: function (value) {
            var val: number = Math.abs(value);
            var newval: string = "";
            if (val >= 10000000) {
              newval = (val / 1000000).toFixed(0) + " M";
            } else if (val > 10000) {
              newval = (val / 1000).toFixed(0) + " K";
            }
            return newval;
          },
        },
      },
    ],
    stroke: {
      width: 2,
      curve: "smooth",
    },
    colors: ["#0C6CF2", "#44cc99", "#ee66dd"],
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: true,
        type: "vertical",
        stops: [0, 30],
      },
    },
    tooltip: {
      x: {
        show: true,
        format: "dd MMM HH:mm",
        formatter: undefined,
      },
      y: {
        formatter: function (value: any) {
          var val: number = Math.abs(value);
          var newvalue: string = "";
          if (val >= 1000000) {
            newvalue = (val / 1000000).toFixed(2) + " M";
          }
          return newvalue;
        },
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
  };

  const setTarget = (chartday: any, index: any) => {
    setTimestamp(chartday);
    setButtonClicked(index);
    if (index == 5) {
      setTimestyle("ddd:HH");
    } else if (index == 4 || index == 3) {
      setTimestyle("HH:mm");
    } else if (index == 2) {
      setTimestyle("HH:mm");
    } else if (index < 2) {
      setTimestyle("HH:mm:ss");
    }
  };

  return (
    <>
      <div className="w-full text-center">
        <div id="chart" className="sm:w-12/12 md:w-10/12 lg:w-10/12 m-auto">
          <Chart options={options} series={dataList} height="400" />
        </div>
        <div className="w-12/12 md:w-10/12 lg:w-10/12 m-auto px-1 md:px-10">
          <div className="w-full lg:flex justify-end">
            <div className="md:text-md mt-1">
              {ChartDays.map((chartday, index) => {
                return (
                  <button
                    value={chartday}
                    className={`py-2 text-xs active:border-none px-3 border-2 active:bg-[#0C6CF277] active:text-white ${
                      index === 0 && "rounded-l-xl"
                    } ${index === ChartDays.length - 1 && "rounded-r-xl"} ${
                      index === buttonclicked &&
                      "bg-[#0C6CF277] border-blue-300 text-[#0C6CF2]"
                    }`}
                    onClick={() => setTarget(chartday, index)}
                    key={`button-${index}`}
                  >
                    {chartsmallButtonName[index]}
                  </button>
                );
              })}
            </div>

            {/* <div className="md:text-md mt-5 block md:hidden">
              {ChartDays.map((chartday, index) => {
                return (
                  <button
                    value={chartday}
                    className={`py-2 text-xs active:border-none px-2 border-2 active:bg-[#0C6CF277] active:text-white ${
                      index === 0 && "rounded-l-xl"
                    } ${index === ChartDays.length - 1 && "rounded-r-xl"} ${
                      index === buttonclicked &&
                      "bg-[#0C6CF277] border-blue-300 text-[#0C6CF2]"
                    }`}
                    onClick={() => setTarget(chartday, index)}
                    key={`button-${index}`}
                  >
                    {chartsmallButtonName[index]}
                  </button>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bankchart;
