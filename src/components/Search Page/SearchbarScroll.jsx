import React, { useRef, useEffect } from 'react'
import { Search } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';

function SearchbarScroll({ isVisible }) {
  const { searchTerm, setSearchTerm } = useSearch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  // Make input a controlled component
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="relative">
      <Search className="absolute xs:top-[19px] top-[18.5px] sm:mt-[7px] mt-[3px] left-4 transform -translate-y-1/2 text-white xs:w-[19px] xs:h-[19px] w-[17px] h-[17px] opacity-70" />
      <input 
        ref={inputRef} 
        className="w-full sm:mt-[4px] mt-[4px] border-[1px] border-white border-opacity-30 sm:h-[44px] h-[35px] rounded-lg bg-transparent pl-11 pr-5 focus:outline-none xs:text-[15px] text-[12px]" 
        placeholder="Search Events" 
        type="text" 
        value={searchTerm} 
        onChange={handleInputChange} 
      />
    </div>
  )
}

export default SearchbarScroll
