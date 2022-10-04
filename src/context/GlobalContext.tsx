import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";

const initialTheme =
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? "dark"
    : "light";

const toggleTheme = (params: { currentTheme: "light" | "dark" }) => {
  if (params.currentTheme === "light") {
    localStorage.theme = "dark";
  } else {
    localStorage.theme = "light";
  }
};

const StoreContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: (params: { currentTheme: "light" | "dark" }) => void;
}>({
  theme: initialTheme,
  toggleTheme,
});

export const GlobalProvider = (params: { children?: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  const toggleTheme = useCallback(
    (params: { currentTheme: "light" | "dark" }) => {
      if (params.currentTheme === "light") {
        localStorage.theme = "dark";
        setTheme("dark");
      } else {
        localStorage.theme = "light";
        setTheme("light");
      }
    },
    [localStorage],
  );

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {params.children}
    </StoreContext.Provider>
  );
};

export const useGlobalContext = () => {
  const storeContext = useContext(StoreContext);
  if (!storeContext) throw new Error("Does not exist [StoreContextProvider]");

  return storeContext;
};
