"use client"

import Heatmap from "@/components/HeatMap"
import type { FC, ReactNode } from "react"
import { APIProvider, ControlPosition, Map, MapControl } from "@vis.gl/react-google-maps"
import { geojson } from "./data"
import { Autocomplete, TextField, Tooltip } from "@mui/material"
import { createContext, useContext, useState } from "react"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const options = [
  { label: 'Pollen' },
  { label: 'Air Pollution' },
  { label: 'Noise Pollution' },
]

// --- FilterSet Context Setup ---
type FilterSetContextType = {
  filterSet: Set<string>
  setFilterSet: React.Dispatch<React.SetStateAction<Set<string>>>
}

const FilterSetContext = createContext<FilterSetContextType | undefined>(undefined)

const FilterSetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [filterSet, setFilterSet] = useState<Set<string>>(new Set(['Noise Pollution']))
  return (
    <FilterSetContext.Provider value={{ filterSet, setFilterSet }}>
      {children}
    </FilterSetContext.Provider>
  )
}

export const useFilterSet = () => {
  const context = useContext(FilterSetContext)
  if (!context) {
    throw new Error("useFilterSet must be used within a FilterSetProvider")
  }
  return context
}

// --- Filter Autocomplete Component ---
const FilterAutocomplete: FC = () => {
  const { setFilterSet } = useFilterSet()
  return (
    <Autocomplete
      className="bg-white"
      multiple
      id="tags-standard"
      options={options}
      getOptionLabel={(option) => option.label}
      defaultValue={[options[2]]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Multiple values"
          placeholder="Filter"
        />
      )}
      onChange={(event, value) =>
        setFilterSet(new Set(value.map((item) => item.label)))
      }
    />
  )
}

// --- Risk Explanations Mapping ---
const riskExplanations: Record<string, string> = {
  "Pollen": "Pollen can trigger seasonal allergies and respiratory issues.",
  "Air Pollution": "Air pollution contains harmful substances that can affect respiratory and cardiovascular health.",
  "Noise Pollution": "Noise pollution can lead to stress, hearing issues, and disrupted sleep.",
}

// --- Expandable Info Toolbar Component with Tooltip ---
const InfoToolbar: FC = () => {
  const [expanded, setExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const { filterSet } = useFilterSet()

  return (
    <div style={{
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      width: expanded ? 300 : 50,
      backgroundColor: "black",
      boxShadow: "0 0 5px rgba(0,0,0,0.3)",
      transition: "width 0.3s ease-in-out",
      overflow: "hidden",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
    }}>
      <Tooltip
        title="Click the arrow to expand this panel for more information"
        arrow
        placement="left"
        open={showTooltip}
      >
        <button
          onClick={() => {
            setExpanded(!expanded)
            setShowTooltip(false)
          }}
          style={{
            alignSelf: "flex-start",
            margin: "8px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            color: "white",
          }}
        >
          {expanded ? "<" : ">"}
        </button>
      </Tooltip>
      {expanded && (
        <div style={{ padding: "16px", color: "white" }}>
          <h3 className="text-xl font-bold mb-5">Your Risks</h3>
          {Array.from(filterSet).map(risk => (
            <div key={risk} style={{ marginBottom: "12px" }}>
              <h2 className="text-lg mb-5" style={{ margin: 0 }}>{risk}</h2>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>{riskExplanations[risk]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- Main Page Component ---
const Page: FC = () => {
  return (
    <APIProvider apiKey={API_KEY || ""}>
      <FilterSetProvider>
        <div style={{ position: "relative", width: '100%', height: '100vh' }}>
          <Map
            mapId={'7a9e2ebecd32a903'}
            defaultCenter={{ lat: 40.7749, lng: -130.4194 }}
            defaultZoom={3}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            cameraControl={true}
          />
          <MapControl position={ControlPosition.TOP_LEFT}>
            <FilterAutocomplete />
          </MapControl>
          <Heatmap geojson={geojson} radius={20} opacity={10} />
          <InfoToolbar />
        </div>
      </FilterSetProvider>
    </APIProvider>
  )
}

export default Page