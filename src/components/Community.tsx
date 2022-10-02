import { useEffect, useState } from "react";
import "./component.css";
import { Tabs } from "./tab_subcomponents/Tabs";
import TabOne from "./tab_subcomponents/TabOne";
import TabTwo from "./tab_subcomponents/TabTwo";
import TabThree from "./tab_subcomponents/TabThree";
import TabFour from "./tab_subcomponents/TabFour";
import TabFive from "./tab_subcomponents/TabFive";

interface CommunityProps {}

const Community: React.FC<CommunityProps> = () => {
  const [actived, setActived] = useState(0);
  const tabs = [
    {
      label: "Supply",
      Component: TabOne,
    },
    {
      label: "Borrow",
      Component: TabTwo,
    },
    {
      label: "Control",
      Component: TabThree,
    },
    {
      label: "Audit",
      Component: TabFour,
    },
    {
      label: "Insurance",
      Component: TabFive,
    },
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 1440, min: 1025 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 769 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 426 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 1
    }
  };

  return (
    <div className="App">
      {/* <Tabs tabs={tabs} /> */}

      <div className="flex justify-start mb-8">
        <button
          data-target="#demo"
          onClick={() => setActived(0)}
          data-slide-to="0"
          className={`px-2 text-xl ${
            actived == 0 ? "border-[#00D395] text-[#00D395]" : "text-[#CCD6DD]"
          } border-b-2 hover:text-[#00D395]`}
        >
          <p className="text-sm md:text-xl font-medium">Supply</p>
        </button>
        <button
          data-target="#demo"
          onClick={() => setActived(1)}
          data-slide-to="1"
          className={`px-2 text-xl ${
            actived == 1 ? "border-[#00D395] text-[#00D395]" : "text-[#CCD6DD]"
          } border-b-2 hover:text-[#00D395]`}
        >
          <p className="text-sm md:text-xl font-medium">Borrow</p>
        </button>
        <button
          data-target="#demo"
          onClick={() => setActived(2)}
          data-slide-to="2"
          className={`px-2 text-xl ${
            actived == 2 ? "border-[#00D395] text-[#00D395]" : "text-[#CCD6DD]"
          } border-b-2 hover:text-[#00D395]`}
        >
          <p className="text-sm md:text-xl font-medium">Control</p>
        </button>
        <button
          data-target="#demo"
          onClick={() => setActived(3)}
          data-slide-to="3"
          className={`px-2 text-xl ${
            actived == 3 ? "border-[#00D395] text-[#00D395]" : "text-[#CCD6DD]"
          } border-b-2 hover:text-[#00D395]`}
        >
          <p className="text-sm md:text-xl font-medium">Audit</p>
        </button>
        <button
          data-target="#demo"
          onClick={() => setActived(4)}
          data-slide-to="4"
          className={`px-2 text-xl ${
            actived == 4 ? "border-[#00D395] text-[#00D395]" : "text-[#CCD6DD]"
          } border-b-2 hover:text-[#00D395]`}
        >
          <p className="text-sm md:text-xl font-medium">Insurance</p>
        </button>
      </div>

      <div id="demo" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="pb-10 carousel-item active">
            <TabOne responsive = {responsive} />
          </div>
          <div className="pb-10 carousel-item">
            <TabTwo responsive = {responsive} />
          </div>
          <div className="pb-10 carousel-item">
            <TabThree responsive = {responsive} />
          </div>
          <div className="pb-10 carousel-item">
            <TabFour responsive = {responsive} />
          </div>
          <div className="pb-10 carousel-item">
            <TabFive responsive = {responsive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
