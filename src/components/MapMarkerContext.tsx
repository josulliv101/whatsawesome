"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export const MapMarkerContext = createContext<any>(null);

export function MapMarkerContextProvider({ children }: PropsWithChildren<{}>) {
  const list = useState({});
  return (
    <MapMarkerContext.Provider value={list}>
      {children}
    </MapMarkerContext.Provider>
  );
}

export function useMapMarkerContext() {
  return useContext(MapMarkerContext);
}
