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

  return (
    <div className="App">
      {/* <Tabs tabs={tabs} /> */}

      <div className="flex justify-start mb-8">
        <button data-target="#demo" onClick={() => setActived(0)} data-slide-to="0" className={`px-2 text-xl ${actived == 0 ? 'border-[#11DD33] text-[#11DD33]': 'text-[#222222aa]'} border-b-2 hover:text-[#11DD33]`}><p className="text-sm md:text-base">Supply</p></button>
        <button data-target="#demo" onClick={() => setActived(1)} data-slide-to="1" className={`px-2 text-xl ${actived == 1 ? 'border-[#11DD33] text-[#11DD33]': 'text-[#222222aa]'} border-b-2 hover:text-[#11DD33]`}><p className="text-sm md:text-base">Borrow</p></button>
        <button data-target="#demo" onClick={() => setActived(2)} data-slide-to="2" className={`px-2 text-xl ${actived == 2 ? 'border-[#11DD33] text-[#11DD33]': 'text-[#222222aa]'} border-b-2 hover:text-[#11DD33]`}><p className="text-sm md:text-base">Control</p></button>
        <button data-target="#demo" onClick={() => setActived(3)} data-slide-to="3" className={`px-2 text-xl ${actived == 3 ? 'border-[#11DD33] text-[#11DD33]': 'text-[#222222aa]'} border-b-2 hover:text-[#11DD33]`}><p className="text-sm md:text-base">Audit</p></button>
        <button data-target="#demo" onClick={() => setActived(4)} data-slide-to="4" className={`px-2 text-xl ${actived == 4 ? 'border-[#11DD33] text-[#11DD33]': 'text-[#222222aa]'} border-b-2 hover:text-[#11DD33]`}><p className="text-sm md:text-base">Insurance</p></button>
      </div>

      <div id="demo" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <TabOne />
          </div>
          <div className="carousel-item">
            <TabTwo />
          </div>
          <div className="carousel-item">
            <TabThree />
          </div>
          <div className="carousel-item">
            <TabFour />
          </div>
          <div className="carousel-item">
            <TabFive />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Community;
