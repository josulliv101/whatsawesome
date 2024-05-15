"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const Context = createContext<any>(null);

export function MapContextProvider({ children }: PropsWithChildren<{}>) {
  const [mapState, setMapState] = useState("");
  const value = useMemo(
    () => ({
      mapState,
      setMapState,
    }),
    [mapState]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useMapContext() {
  return useContext(Context);
}
