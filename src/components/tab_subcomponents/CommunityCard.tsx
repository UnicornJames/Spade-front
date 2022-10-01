import { Link } from "react-router-dom";
import React from "react";

interface CommunityCardProps {
  card?: any;
}

const CommunityCard = (props: CommunityCardProps) => {
  const { card } = props;

  return (
    <div className="box hover:shadow-xl p-2 md:p-6 transition ease-in-out delay-150 hover:-translate-y-2 duration-300">
      <div className="bg-cover">
        <img className="w-11/12 md:4/6 mb-5" src={card.logo}></img>
      </div>
      <h4 className="mb-5 text-stone-700 text-start">
        {card.title}
      </h4>
      <p className="text-gray-400 text-center md:text-left">
        {card.description}
      </p>
      <div className="flex justify-between text-green hidden hover:block">
        <a>Try</a>
        <span id="arrow" class="arrow"></span>
      </div>
    </div>
  );
};

export default CommunityCard;
