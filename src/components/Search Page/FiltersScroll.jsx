import React from 'react';
import { useFilter } from '../../contexts/FilterContext';

function FiltersScroll() {
  const { filter, setFilter } = useFilter();

  const filters = [
    { name: "All", type: "all" },
    { name: "Tech Talks", type: "tech_talk" },
    { name: "Workshops", type: "workshop" },
    { name: "Activities", type: "activity" },
  ];

  return (
    <div className="flex gap-2.5 border-white border-opacity-15 border-b-[1px] justify-start sm:block hidden">
      <div className="sm:ml-[100px]">
        {filters.map((f) => (
          <button
            key={f.name}
            onClick={() => setFilter(f.type)}
            className={`sm:pr-5 sm:pl-5 pl-3.5 pr-3.5 sm:pt-1 pb-1.5 sm:text-[15px] text-[13px] border-b-[2px] outline-none transition-all ease-out duration-100
              ${
                filter === f.type
                  ? "border-b-[1px] border-white"
                  : "border-b-[1px] border-transparent hover:border-opacity-20 hover:bg-white hover:bg-opacity-5 border-transparent"
              }`}
          >
            {f.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FiltersScroll;
