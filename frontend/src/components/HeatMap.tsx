"use client"

import { useEffect, useMemo } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import type { FeatureCollection, Point, GeoJsonProperties } from 'geojson';
import { useFilterSet } from '@/app/map/page';

type HeatmapProps = {
  geojson: FeatureCollection<Point, GeoJsonProperties>;
  radius: number;
  opacity: number;
};

const Heatmap = ({ geojson, radius, opacity }: HeatmapProps) => {
  const map = useMap();
  const visualization = useMapsLibrary('visualization');
  const { filterSet } = useFilterSet();

  // Create the heatmap layer when visualization is ready
  const heatmap = useMemo(() => {
    if (!visualization) return null;

    return new google.maps.visualization.HeatmapLayer({
      radius: radius,
      opacity: opacity
    });
  }, [visualization, radius, opacity]);

  const filteredFeatures = useMemo(() => {
    return geojson.features.filter((point: any) => {
      return point.risk_factors && point.risk_factors.some((rf: string) => filterSet.has(rf));
    });
  }, [geojson.features, filterSet]);

  useEffect(() => {
    if (!heatmap) return;

    const heatmapData = filteredFeatures.map((point: any) => {
      const [lng, lat] = point.geometry.coordinates;
      return {
        location: new google.maps.LatLng(lat, lng),
        weight: point.properties?.mag || 1,
      };
    });

    heatmap.setData(heatmapData);
  }, [heatmap, filteredFeatures]);

  useEffect(() => {
    if (!heatmap) return;

    heatmap.setMap(map);
    return () => {
      heatmap.setMap(null);
    };
  }, [heatmap, map]);

  return null;
};

export default Heatmap;