"use client";

import { useState } from "react";

const DesSelStep1Screen3ProjectSlideRates = ({
  productRates,
  constructionRates,
}) => {
  const [showSecondaryRates, setShowSecondaryRates] = useState(false);
  return (
    <>
      <div className="relative">
        {showSecondaryRates && (
          <div className="bg-white absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full text-sm font-light py-1 px-1.5 border border-black/30 whitespace-nowrap shadow-btn after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white">
            <div>{productRates[1]}</div>
            <hr className="border-black/10 my-1" />
            <div>{constructionRates[1]}</div>
          </div>
        )}
        <button
          onClick={() => setShowSecondaryRates(prevState => !prevState)}
          className="uppercase px-2 py-1.5 rounded text-sm font-bold opacity-80 bg-[#EFEFEF]/70">
          <div>
            {productRates[0]} <span className="text-xxs font-normal"></span>
          </div>
          <hr className="border-black/40 my-1" />
          <div>
            {constructionRates[0]}{" "}
            <span className="text-xxs font-normal"></span>
          </div>
        </button>
      </div>
    </>
  );
};

export default DesSelStep1Screen3ProjectSlideRates;
