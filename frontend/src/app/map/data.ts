import type {FeatureCollection, Point, GeoJsonProperties} from 'geojson';

export type RiskFactor = "Air Pollution"
  | "Noise Pollution"
  | "Pollen"
  | "Heat"

export interface DataPoint extends GeoJsonProperties {
  risk_factors: RiskFactor[];
}

/*
Sample Data
*/
export const geojson: FeatureCollection<Point, DataPoint> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.4194, 37.7749] // San Francisco
      },
      properties: {
        name: 'San Francisco',
        description: 'A major city in California'
      },
      risk_factors: ["Air Pollution"]
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-74.0060, 40.7128] // New York City
      },
      properties: {
        name: 'New York City',
        description: 'The largest city in the United States'
      },
      risk_factors: ["Noise Pollution"]
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-72.0060, 40.7128] // New York City
      },
      properties: {
        name: 'New York City',
        description: 'The largest city in the United States'
      },
      risk_factors: ["Pollen"]
    }
  ]
};
