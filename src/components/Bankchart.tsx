import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
// import { socket } from "../socket";
import { ApexOptions } from "apexcharts";
import "../index.css";

interface BankchartProps {
  cash: any;
  borrow: any;
  high: any;
  chartdata: any;
  servertime : any;
}

const X: number = 0;

const Bankchart: React.FC<BankchartProps> = ({
  cash,
  borrow,
  high,
  chartdata,
  servertime,
}) => {
  const series: any = [
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
  const [seriesdata, setSeriesdata] = useState(series);
  const [timestamp, setTimestamp] = useState(21600 * 1000);
  // const [seriesa, setSeriesa] = useState([]);
  // const [seriesb, setSeriesb] = useState([]);
  // const [seriesc, setSeriesc] = useState([]);
  // const [mindate, setMindate] = useState(0);
  // const [maxdate, setMaxdate] = useState(0);
  const [buttonclicked, setButtonClicked] = useState(2);
  const [logarithmic, setLogarithmic] = useState(false);
  const [lineartarget, setLinearTarget] = useState(0);
  // const [tcash, setTcash] = useState(cash);
  // const [thigh, setThigh] = useState(high);
  // const [tborrow, setTborrow] = useState(borrow);
  // const [servertime, setServertime] = useState(0);
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

  useEffect(() => {
    const seriesCash: any = [];
    const seriesHigh: any = [];
    const seriesBorrow: any = [];
    const date: number = new Date().getTime() + 7200;

    chartdata &&
      chartdata.map((item: any) => {
        seriesCash.push({ x: item.timestamp, y: item.total[0] });
        seriesHigh.push({ x: item.timestamp, y: item.total[1] });
        seriesBorrow.push({ x: item.timestamp, y: item.total[2] });
      });

    setSeriesdata([
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

    const addData = (data: any, value: number) => {
      return [
        ...data,
        {
          x: servertime,
          y: value,
        },
      ];
    };

    let chartinterval = setInterval(() => {
      setSeriesdata(
        seriesdata.map((item: any, key: number) => {
          if (item.name == "Cash") {
            return {
              name: item.name,
              data: addData(item.data, cash),
            };
          } else if (item.name == "High Quality Liquid Assets (HQLA)") {
            return {
              name: item.name,
              data: addData(item.data, high),
            };
          } else {
            return {
              name: item.name,
              data: addData(item.data, borrow),
            };
          }
        }),
      );
    }, 5000);
    return () => {
      clearInterval(chartinterval);
    };
  }, [cash, high, borrow]);

  // get input data from api
  // const GetChartData = async (langer: any) => {
  //   await fetch(
  //     "https://api.blockchain.info/charts/market-price?timespan=" +
  //       `${timestamp}` +
  //       "&sampled=true&metadata=false&cors=true&format=json",
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       var datas = data.values;
  //       var newData = [];
  //       if (langer === 7 || langer === 30) {
  //         for (var i = 0; i < datas.length; i++) {
  //           if (i % langer == 0) {
  //             newData[i / langer] = datas[i];
  //           }
  //         }
  //       } else {
  //         newData = datas;
  //       }
  //       newData.map((item: any) => {
  //         item.x = item.x * 1000;
  //       });
  //       // var newData2 = newData;
  //       // newData2.map((item: any) => {
  //       //   item.y = item.y + 20000;
  //       // });

  //       setMindate(newData[0].x);
  //       setMaxdate(newData[newData.length - 1].x);
  //       setSeriesa(newData);
  //       // setSeriesa2(newData2);
  //     });
  // };

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
          speed: 5000,
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
        logarithmic: logarithmic,
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
        formatter: function (value: number) {
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

  const LinerTarget = (index: any, target: any) => {
    setLinearTarget(index);
    setLogarithmic(target);
  };

  return (
    <>
      <div className="w-full text-center">
        <div id="chart" className="sm:w-12/12 md:w-10/12 lg:w-10/12 m-auto">
          <Chart options={options} series={seriesdata} height="400" />
        </div>
        <div className="sm:w-12/12 md:w-10/12 lg:w-10/12 m-auto px-1 md:px-10">
          <div className="w-full lg:flex justify-between">
            <div className="text-md mt-5">
              {ChartDays.map((chartday, index) => {
                return (
                  <button
                    value={chartday}
                    className={`py-2 text-xs active:border-none xs:px-1 md:px-2 border-2 active:bg-[#0C6CF277] active:text-white ${
                      index === 0 && "rounded-l-xl"
                    } ${index === ChartDays.length - 1 && "rounded-r-xl"} ${
                      index === buttonclicked &&
                      "bg-[#0C6CF277] border-blue-300 text-[#0C6CF2]"
                    }`}
                    onClick={() => setTarget(chartday, index)}
                    key={`button-${index}`}
                  >
                    {chartButtonName[index]}
                  </button>
                );
              })}
            </div>

            <div className="sm:w-12/12 mt-5 lg:flex justify-start">
              <button
                className={`py-2 text-xs active:border-none xs:px-1 md:px-2 border-2 active:bg-[#0C6CF277] active:text-white rounded-l-xl ${
                  lineartarget === 0 &&
                  "bg-[#0C6CF277] border-blue-300 text-[#0C6CF2]"
                }`}
                onClick={() => LinerTarget(0, false)}
              >
                Linear Scale
              </button>
              <button
                className={`py-2 text-xs active:border-none xs:px-1 md:px-2 border-2 active:bg-[#0C6CF277] active:text-white rounded-r-xl ${
                  lineartarget === 1 &&
                  "bg-[#0C6CF277] border-blue-300 text-[#0C6CF2]"
                }`}
                onClick={() => LinerTarget(1, true)}
              >
                Logarithmic Scale
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bankchart;
