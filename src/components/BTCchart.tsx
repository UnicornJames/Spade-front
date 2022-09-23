import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import "../index.css";

const BTCchart: React.FC = () => {
  const [timestamp, setTimestamp] = useState("1year");
  const [seriesarr, setSeriesarr] = useState([]);
  const [buttonclicked, setButtonClicked] = useState(3);
  const [mindate, setMindate] = useState(0);
  const [maxdate, setMaxdate] = useState(0);
  const [logarithmic, setLogarithmic] = useState(false);
  const [lineartarget, setLinearTarget] = useState(0);
  const [langer, setLanger] = useState(1);
  const [langbuttonetarget, setlangbuttontarget] = useState(0);

  const ChartDays = ["30days", "60days", "180days", "1year", "3years", "all"];

  const chartButtonName = [
    "30 Days",
    "60 Days",
    "180 Days",
    "1 Year",
    "3 Years",
    "All Time",
  ];

  const setTarget = (chartday: any, index: any) => {
    setTimestamp(chartday);
    setButtonClicked(index);
  };

  const LinerTarget = (index: any, target: any) => {
    setLinearTarget(index);
    setLogarithmic(target);
  };

  const series = [
    {
      name: "Price",
      data: seriesarr,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      width: "100%",
      height: "500px",
      zoom: {
        enabled: false,
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
      min: mindate,
      max: maxdate,
      title: {
        text: 'Date'
      },
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
        },
      },
    },
    yaxis: {
      title: {
        text: 'USD'
      },
      logarithmic: logarithmic,
      min: 0,
      max: 80000,
      tickAmount: 4,
      labels: {
    formatter: function(value) {
      var val: number = Math.abs(value)
      var newval: string = ''
      if (val >= 1000) {
        newval = (val / 1000).toFixed(0) + ' K'
      }
      return newval
    }
      }
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    colors: ["#0C6CF2"],
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: true,
        gradientToColors: ["#0C6CF2"],
        type: "vertical",
        stops: [0, 30],
      },
    },
    tooltip: {
      x: {
          show: true,
          format: 'dd MMM',
          formatter: undefined,
      },
      y: {
          formatter: function(value: number) {
            var val: number = Math.abs(value)
            var newvalue: string
            if (val >= 1000) {
              newvalue = (val / 1000).toFixed(3) + ' K'
            }
            return newvalue
          },
          title: {
              formatter: (seriesName) => seriesName,
          },
      },
    }
  };

  useEffect(() => {
    getchartdata(langer);
  }, [timestamp, langer]);

  const getchartdata = async (langer: any) => {
    await fetch(
      "https://api.blockchain.info/charts/market-price?timespan=" +
        `${timestamp}` +
        "&sampled=true&metadata=false&cors=true&format=json",
    )
      .then((response) => response.json())
      .then((data) => {
        var datas = data.values;
        var newData = [];
        if (langer === 7 || langer === 30) {
          for (var i = 0; i < datas.length; i++) {
            if (i % langer == 0) {
              newData[i / langer] = datas[i];
            }
          }
        } else {
          newData = datas;
        }
        newData.map((item: any) => {
          item.x = item.x * 1000;
        });
        setMindate(newData[0].x);
        setMaxdate(newData[newData.length - 1].x);
        setSeriesarr(newData);
      });
  };

  const setlen = (index: any, leng: any) => {
    setLanger(leng);
    setlangbuttontarget(index);
  };

  return (
    <div className="w-full text-center">
      <div id="chart" className="sm:w-12/12 md:w-10/12 lg:w-10/12 m-auto">
        <Chart options={options} series={series} height="400" />
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
                >
                  {chartButtonName[index]}
                </button>
              );
            })}
          </div>
          <div className="mt-5">
            <button
              className={`py-2 text-xs active:border-none xs:px-1 md:px-2 border-2 active:bg-[#0C6CF277] active:text-white rounded-l-xl ${
                langbuttonetarget == 0 &&
                "bg-[#0C6CF277] border-blue-300 text-[#0C6CF2]"
              }`}
              onClick={() => setlen(0, 1)}
            >
              Raw Values
            </button>
            <button
              className={`py-2 text-xs active:border-none xs:px-1 md:px-2 border-2 active:bg-[#0C6CF277] active:text-white ${
                langbuttonetarget == 1 &&
                "bg-[#0C6CF277] border-blue-300 text-[#0C6CF2]"
              }`}
              onClick={() => setlen(1, 7)}
            >
              7 Day Average
            </button>
            <button
              className={`py-2 text-xs active:border-none xs:px-1 md:px-2 border-2 active:bg-[#0C6CF277] active:text-white rounded-r-xl ${
                langbuttonetarget == 2 &&
                "bg-[#0C6CF277] border-blue-300 text-[#0C6CF2]"
              }`}
              onClick={() => setlen(2, 30)}
            >
              30 Day Average
            </button>
          </div>
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
  );
};

export default BTCchart;
