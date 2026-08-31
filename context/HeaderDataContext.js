import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "rs-header-nav";

const HeaderDataContext = createContext({
  services: [],
  products: [],
  isLoading: true,
});

let memoryCache = { products: [], services: [] };
let inflight = null;

function readSessionNav() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    return {
      products: Array.isArray(parsed?.products) ? parsed.products : [],
      services: Array.isArray(parsed?.services) ? parsed.services : [],
    };
  } catch {
    return null;
  }
}

function writeSessionNav(data) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota / private-mode errors
  }
}

function loadHeaderNav() {
  if (inflight) {
    return inflight;
  }

  inflight = fetch("/api/header-nav/")
    .then((response) =>
      response.ok ? response.json() : { products: [], services: [] },
    )
    .then((payload) => {
      const data = {
        products: Array.isArray(payload?.products) ? payload.products : [],
        services: Array.isArray(payload?.services) ? payload.services : [],
      };

      memoryCache = data;
      writeSessionNav(data);

      return data;
    })
    .catch(() => memoryCache)
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function HeaderDataProvider({ children }) {
  const [products, setProducts] = useState(memoryCache.products);
  const [services, setServices] = useState(memoryCache.services);
  const [isLoading, setIsLoading] = useState(
    !memoryCache.products.length && !memoryCache.services.length,
  );

  useEffect(() => {
    const sessionNav = readSessionNav();

    if (sessionNav) {
      memoryCache = sessionNav;
      setProducts(sessionNav.products);
      setServices(sessionNav.services);

      if (sessionNav.products.length || sessionNav.services.length) {
        setIsLoading(false);
      }
    }

    let cancelled = false;

    loadHeaderNav().then((data) => {
      if (cancelled) {
        return;
      }

      setProducts(data.products);
      setServices(data.services);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HeaderDataContext.Provider
      value={{
        services,
        products,
        isLoading,
      }}
    >
      {children}
    </HeaderDataContext.Provider>
  );
}

export function useHeaderData() {
  return useContext(HeaderDataContext);
}
