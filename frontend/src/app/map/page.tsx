"use client";

import { FC } from "react";
import { APIProvider, Map, MapControl, ControlPosition } from "@vis.gl/react-google-maps";
import Heatmap from "@/components/HeatMap";
import FilterAutocomplete from "@/components/FilterAutocomplete";
import InfoToolbar from "@/components/InfoToolbar";
import { FilterSetProvider } from "@/components/FilterSetProvider";
import { useHeatMap } from "@/components/HeatMapProvider";
import { unpopulatedGeojson } from "./data";
import { Box } from "@mui/material";
import LocationAutocomplete from "@/components/LocationAutocomplete";
  
const PageContent: FC = () => {
  const { points } = useHeatMap();

  const defaultCenter = { lat: 40.7749, lng: -130.4194 };
  const mapCenter =
    points.length > 0
      ? { lat: points[0].geometry.coordinates[1], lng: points[0].geometry.coordinates[0] }
      : defaultCenter;
  
  const defaultZoom = points.length > 0 ? 12 : 7;

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Map
        mapId={"7a9e2ebecd32a903"}
        defaultCenter={mapCenter}
        defaultZoom={defaultZoom}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        cameraControl={true}
      />
      <MapControl position={ControlPosition.TOP_LEFT}>
        <Box className="p-2 m-2 flex flex-row gap-4 bg-white rounded-2xl">
          <LocationAutocomplete className="bg-white w-xl" />
          <FilterAutocomplete />

        </Box>
      </MapControl>
      <Heatmap geojson={points} radius={30} opacity={0.5} />
      <InfoToolbar />
    </div>
  );
};

const MainPage: FC = () => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <FilterSetProvider>
        <PageContent />
      </FilterSetProvider>
    </APIProvider>
  );
};

export default MainPage;