import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = saved !== null ? JSON.parse(saved) : defaultValue;
  return initial ?? defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};