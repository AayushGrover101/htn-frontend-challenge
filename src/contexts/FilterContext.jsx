import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

// Context to share Filters state across the application
export function FilterProvider({ children }) {
  const [filter, setFilter] = useState("all");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}