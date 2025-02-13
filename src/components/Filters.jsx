import React, { useState } from 'react';
import { useFilter } from '../contexts/FilterContext';

function Filters() {
  const { filter, setFilter } = useFilter();

  const filters = [
    { name: "ALL", type: "all", color: "text-white", bg: "bg-white", hover: "hover:bg-white" },
    { name: "TECH TALKS", type: "tech_talk", color: "text-[#FF00BF]", bg: "bg-[#FF00BF]", hover: "hover:bg-[#FF00BF]" },
    { name: "WORKSHOPS", type: "workshop", color: "text-[#00C4FF]", bg: "bg-[#00C4FF]", hover: "hover:bg-[#00C4FF]" },
    { name: "ACTIVITIES", type: "activity", color: "text-[#FF8C00]", bg: "bg-[#FF8C00]", hover: "hover:bg-[#FF8C00]" },
  ];

  return (
    <>
      <div className="sm:mt-5 mt-3.5 flex justify-center gap-2.5 pb-[50px]">
        {filters.map((f) => (
          <button 
            key={f.name}
            onClick={() => setFilter(f.type)}
            className={`sm:pr-3.5 sm:pl-3.5 xs:pr-2.5 xs:pl-2.5 pr-2 pl-2 sm:text-sm xs:text-xs text-[10px] pt-1 pb-1 font-medium rounded-lg transition-all duration-300 outline-none border-[2px] border-transparent
                        ${
                          filter === f.type 
                            ? `${f.color} ${f.bg} bg-opacity-[15%]`
                            : `${f.hover} hover:bg-opacity-[15%] hover:text-white`
                        }`}
          >
            {f.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default Filters