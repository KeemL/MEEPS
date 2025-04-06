// HeatMapContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GeoJsonProperties, Feature, Point } from "geojson";

export type RiskFactor = "Air Pollution" | "Pollen" | "Heat" | "UV Index";

export interface DataPoint extends GeoJsonProperties {
  risk_factors: RiskFactor[];
}

interface HeatMapContextProps {
  points: Feature<Point, DataPoint>[];
  setPoints: React.Dispatch<React.SetStateAction<Feature<Point, DataPoint>[]>>;
}

const HeatMapContext = createContext<HeatMapContextProps | undefined>(undefined);

export const HeatMapProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState<Feature<Point, DataPoint>[]>([]);
  return (
    <HeatMapContext.Provider value={{ points, setPoints }}>
      {children}
    </HeatMapContext.Provider>
  );
};

export const useHeatMap = (): HeatMapContextProps => {
  const context = useContext(HeatMapContext);
  if (!context) {
    throw new Error('useHeatMap must be used within a HeatMapProvider');
  }
  return context;
};