import { Link } from "react-router-dom";
import React from "react";

interface EcoSystemCardProps {
  card?: any;
}

const EcoSystemCard = (props: EcoSystemCardProps) => {
  const { card } = props;

  return (
    <div className="box shadow-xl hover:shadow-2xl p-2 md:p-6 flex">
      <div className="w-3/12">
        <img className="w-full" src={card.logo}></img>
      </div>
      <h4 className="w-9/12 mb-5 text-stone-700 text-start">
        {card.title}
      </h4>
      {/* <div className="text-[#00D395] EcoSystemCard absolute items-center hover: px-10 w-full">
        <a className="flex justify-between font-bold">
          <p>Try</p>
          <p><img src="arrowRight1.svg" alt=" " className="w-5 text-[#00D395]"></img></p>
        </a>
      </div> */}
    </div>
  );
};

export default EcoSystemCard;
