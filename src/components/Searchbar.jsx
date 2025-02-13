import React, { useRef, useEffect } from 'react'
import { Search } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';

function Searchbar({ inputRef }) {
  const { searchTerm, setSearchTerm } = useSearch();

  // Auto-focus input on component mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Make input a controlled component
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  }

  return (
    <>
      <div className="flex justify-center mt-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white sm:w-[19px] sm:h-[19px] w-[17px] h-[17px] opacity-70 pb-[0.5px]" />
          <input
            className="sm:h-[45px] h-[38px] sm:text-[16px] text-sm sm:w-[450px] lg:w-[520px] xs:w-[75vw] w-[80vw] border-[2px] border-transparent focus:border-opacity-20 focus:border-white focus:outline-none rounded-lg bg-white bg-opacity-[6%] pl-11 pr-5 pb-[1px]"
            placeholder="Search Events"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            ref={inputRef}
          />
        </div>
      </div>
    </>
  )
}

export default Searchbar