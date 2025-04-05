import type {FeatureCollection, Point, GeoJsonProperties} from 'geojson';
/*
Sample Data
*/
export const geojson: FeatureCollection<Point, GeoJsonProperties> = {
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
      }
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
      }
    }
  ]
};
