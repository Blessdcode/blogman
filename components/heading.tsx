import React from "react";

type title = { 
  title: string;
};

const HeadingModel = ({ title }: title) => {
  return (
    <div className="border-t border-b border-white">
      <h1 className="font-semibold sm:text-[140px] text-[38px]  sm:leading-[160.8px] leading-[41.8px] tracking-[10px] text-center w-full uppercase">
        {title}
      </h1>
    </div>
  );
};

export default HeadingModel;
