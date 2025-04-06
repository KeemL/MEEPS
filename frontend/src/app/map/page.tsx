"use client";

import { FC, useEffect, useState } from "react";
import { APIProvider, Map, MapControl, ControlPosition } from "@vis.gl/react-google-maps";
import Heatmap from "@/components/HeatMap";
import FilterAutocomplete from "@/components/FilterAutocomplete";
import InfoToolbar from "@/components/InfoToolbar";
import { FilterSetProvider } from "@/components/FilterSetProvider";
import { useHeatMap } from "@/components/HeatMapProvider";
import { Box } from "@mui/material";
import { useUserData } from "@/components/UserDataProvider";

const PageContent: FC = () => {
  const { points } = useHeatMap();
  const { patientData } = useUserData();

  // Use the address from patientData if available; otherwise, fallback to a default address.
  const address = patientData?.address || "New York, NY";

  const initialCenter = { lat: 40.7749, lng: -130.4194 };
  const [center, setCenter] = useState(initialCenter);

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCenter({ lat: location.lat, lng: location.lng });
        } else {
          console.error("Geocoding error:", data.status);
        }
      } catch (error) {
        console.error("Error fetching geocode data:", error);
      }
    };

    geocodeAddress();
  }, [address]);

  const zoomLevel = points.length > 0 ? 12 : 7;

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Map
        mapId={"7a9e2ebecd32a903"}
        defaultCenter={center}
        defaultZoom={zoomLevel}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        cameraControl={true}
      />
      <MapControl position={ControlPosition.TOP_LEFT}>
        <Box className="p-2 m-2 flex flex-row gap-4 bg-white rounded-2xl">
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