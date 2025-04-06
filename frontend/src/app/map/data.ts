import { FeatureCollection, Point } from 'geojson';

interface DataPoint {
  name: string;
}

export const unpopulatedGeojson: FeatureCollection<Point, DataPoint> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-74.0060, 40.7128], // New York, NY
      },
      properties: {
        name: 'New York, NY',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.2437, 34.0522], // Los Angeles, CA
      },
      properties: {
        name: 'Los Angeles, CA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-87.6298, 41.8781], // Chicago, IL
      },
      properties: {
        name: 'Chicago, IL',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-95.3698, 29.7604], // Houston, TX
      },
      properties: {
        name: 'Houston, TX',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.0740, 33.4484], // Phoenix, AZ
      },
      properties: {
        name: 'Phoenix, AZ',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-75.1652, 39.9526], // Philadelphia, PA
      },
      properties: {
        name: 'Philadelphia, PA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-98.4936, 29.4241], // San Antonio, TX
      },
      properties: {
        name: 'San Antonio, TX',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.1611, 32.7157], // San Diego, CA
      },
      properties: {
        name: 'San Diego, CA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-96.7970, 32.7767], // Dallas, TX
      },
      properties: {
        name: 'Dallas, TX',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.8863, 37.3382], // San Jose, CA
      },
      properties: {
        name: 'San Jose, CA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-97.7431, 30.2672], // Austin, TX
      },
      properties: {
        name: 'Austin, TX',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-81.6557, 30.3322], // Jacksonville, FL
      },
      properties: {
        name: 'Jacksonville, FL',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-97.3308, 32.7555], // Fort Worth, TX
      },
      properties: {
        name: 'Fort Worth, TX',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.9988, 39.9612], // Columbus, OH
      },
      properties: {
        name: 'Columbus, OH',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-80.8431, 35.2271], // Charlotte, NC
      },
      properties: {
        name: 'Charlotte, NC',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-86.1581, 39.7684], // Indianapolis, IN
      },
      properties: {
        name: 'Indianapolis, IN',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.4194, 37.7749], // San Francisco, CA
      },
      properties: {
        name: 'San Francisco, CA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.3321, 47.6062], // Seattle, WA
      },
      properties: {
        name: 'Seattle, WA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-104.9903, 39.7392], // Denver, CO
      },
      properties: {
        name: 'Denver, CO',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.0369, 38.9072], // Washington, DC
      },
      properties: {
        name: 'Washington, DC',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-71.0589, 42.3601], // Boston, MA
      },
      properties: {
        name: 'Boston, MA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-106.4850, 31.7619], // El Paso, TX
      },
      properties: {
        name: 'El Paso, TX',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-86.7816, 36.1627], // Nashville, TN
      },
      properties: {
        name: 'Nashville, TN',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-83.0458, 42.3314], // Detroit, MI
      },
      properties: {
        name: 'Detroit, MI',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-97.5164, 35.4676], // Oklahoma City, OK
      },
      properties: {
        name: 'Oklahoma City, OK',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6750, 45.5051], // Portland, OR
      },
      properties: {
        name: 'Portland, OR',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.1398, 36.1699], // Las Vegas, NV
      },
      properties: {
        name: 'Las Vegas, NV',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-90.0490, 35.1495], // Memphis, TN
      },
      properties: {
        name: 'Memphis, TN',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-85.7585, 38.2527], // Louisville, KY
      },
      properties: {
        name: 'Louisville, KY',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-76.6122, 39.2904], // Baltimore, MD
      },
      properties: {
        name: 'Baltimore, MD',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-87.9065, 43.0389], // Milwaukee, WI
      },
      properties: {
        name: 'Milwaukee, WI',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-106.6504, 35.0844], // Albuquerque, NM
      },
      properties: {
        name: 'Albuquerque, NM',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-110.9747, 32.2226], // Tucson, AZ
      },
      properties: {
        name: 'Tucson, AZ',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-119.7871, 36.7378], // Fresno, CA
      },
      properties: {
        name: 'Fresno, CA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.4944, 38.5816], // Sacramento, CA
      },
      properties: {
        name: 'Sacramento, CA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-94.5786, 39.0997], // Kansas City, MO
      },
      properties: {
        name: 'Kansas City, MO',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.1937, 33.7701], // Long Beach, CA
      },
      properties: {
        name: 'Long Beach, CA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.8315, 33.4152], // Mesa, AZ
      },
      properties: {
        name: 'Mesa, AZ',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-84.3880, 33.7490], // Atlanta, GA
      },
      properties: {
        name: 'Atlanta, GA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-104.8214, 38.8339], // Colorado Springs, CO
      },
      properties: {
        name: 'Colorado Springs, CO',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-75.9780, 36.8529], // Virginia Beach, VA
      },
      properties: {
        name: 'Virginia Beach, VA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-78.6382, 35.7796], // Raleigh, NC
      },
      properties: {
        name: 'Raleigh, NC',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-95.9345, 41.2565], // Omaha, NE
      },
      properties: {
        name: 'Omaha, NE',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-80.1918, 25.7617], // Miami, FL
      },
      properties: {
        name: 'Miami, FL',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.2711, 37.8044], // Oakland, CA
      },
      properties: {
        name: 'Oakland, CA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-93.2650, 44.9778], // Minneapolis, MN
      },
      properties: {
        name: 'Minneapolis, MN',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-95.9928, 36.1540], // Tulsa, OK
      },
      properties: {
        name: 'Tulsa, OK',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-97.3301, 37.6872], // Wichita, KS
      },
      properties: {
        name: 'Wichita, KS',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-90.0715, 29.9511], // New Orleans, LA
      },
      properties: {
        name: 'New Orleans, LA',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-97.1081, 32.7357], // Arlington, TX
      },
      properties: {
        name: 'Arlington, TX',
      },
    },
  ],
};