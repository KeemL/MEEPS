"use client";

import { createContext, useContext, useState, FC, ReactNode } from "react";

// Define the shape of your patient data.
export interface PatientData {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  conditions: string[];
  risk_factors: string[];
  geojson: any; // Replace 'any' with a more specific type if available (e.g., FeatureCollection from 'geojson')
}

interface UserDataContextType {
  patientData: PatientData | null;
  setPatientData: (data: PatientData) => void;
}

// Create a Context with an undefined default value.
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Provider component
export const UserDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  return (
    <UserDataContext.Provider value={{ patientData, setPatientData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to use the user data context.
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};