import { createContext, useContext, useState, FC, ReactNode } from "react";

type FilterSetContextType = {
  filterSet: Set<string>;
  setFilterSet: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const FilterSetContext = createContext<FilterSetContextType | undefined>(undefined);

export const FilterSetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [filterSet, setFilterSet] = useState<Set<string>>(new Set(["Pollen"]));
  return (
    <FilterSetContext.Provider value={{ filterSet, setFilterSet }}>
      {children}
    </FilterSetContext.Provider>
  );
};

export const useFilterSet = () => {
  const context = useContext(FilterSetContext);
  if (!context) {
    throw new Error("useFilterSet must be used within a FilterSetProvider");
  }
  return context;
};