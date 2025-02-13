import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

// Context to Share Search State amongs Main Search and TopBar Search
export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext);
}