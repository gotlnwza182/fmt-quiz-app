"use client";
import { FC, createContext, useState } from "react";

interface MyContextValue {
  appState: { type: string; title: string };
  setAppState: (newData: { type: string; title: string }) => void;
  isDark: boolean;
  setIsDark: (newData: boolean) => void;
}

interface MyContextProviderProps {
  children: React.ReactNode;
}

const defaultValue: MyContextValue = {
  appState: { type: "", title: "" },
  setAppState: () => {},
  isDark: false,
  setIsDark: () => {},
};

const AppStateContext = createContext<MyContextValue>(defaultValue);

const AppStateProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<{ type: string; title: string }>({
    type: "menu",
    title: "",
  });

  const [isDark, setIsDark] = useState(false);

  const contextValue = {
    appState,
    setAppState,
    isDark,
    setIsDark,
  };
  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
