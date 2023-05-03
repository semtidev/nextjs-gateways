import { useState, useEffect } from "react";

export function useLocalStorage(key, initialState) {
  const [state, setState] = useState(initialState);

  // Load data from local storage
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item && item !== null && item !== "") {
      const gateways = JSON.parse(item);
      if (gateways.length > 0) setState(gateways);
    }
  }, []);

  // Persist data in local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
