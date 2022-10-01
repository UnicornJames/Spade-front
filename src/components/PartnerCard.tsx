import { Link } from "react-router-dom";
import React from "react";

interface PartnerCardProps {
  card?: any;
}

const PartnerCard = (props: PartnerCardProps) => {
  const { card } = props;

  return (
    <div className="box border p-2 md:p-6 transition ease-in-out delay-150 hover:-translate-y-2 duration-300">
      <div className="bg-cover">
        <img className="w-11/12 md:4/6 mb-5" src={card.logo}></img>
      </div>
      <h4 className="mb-5 text-stone-700 flex justify-center text-center">
        {card.title}
      </h4>
      <p className="text-gray-400 text-center md:text-left">
        {card.description}
      </p>
    </div>
  );
};

export default PartnerCard;
