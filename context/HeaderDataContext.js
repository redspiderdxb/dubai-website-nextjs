import { createContext, useContext } from "react";

const HeaderDataContext = createContext({
  services: [],
  products: [],
});

export function HeaderDataProvider({ children, services = [], products = [] }) {
  return (
    <HeaderDataContext.Provider
      value={{
        services,
        products,
      }}
    >
      {children}
    </HeaderDataContext.Provider>
  );
}

export function useHeaderData() {
  return useContext(HeaderDataContext);
}
