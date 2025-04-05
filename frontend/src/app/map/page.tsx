"use client"

import Heatmap from "@/components/HeatMap"
import type { FC } from "react"
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { geojson } from "./data";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const Page: FC = () => {
  return (
    <APIProvider apiKey={API_KEY || ""}>
      <div style={{ width: '100%', height: '100vh' }}>
        <Map
            mapId={'7a9e2ebecd32a903'}
            defaultCenter={{lat: 40.7749, lng: -130.4194}}
            defaultZoom={3}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          />
        <Heatmap geojson={geojson} radius={20} opacity={10}/>
      </div>
    </APIProvider>
  )
}

export default Page