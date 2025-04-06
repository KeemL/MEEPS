"use client"

import { useEffect, useMemo } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import type { FeatureCollection, Point, GeoJsonProperties } from 'geojson';
import { useFilterSet } from '@/components/FilterSetProvider';

type HeatmapProps = {
  geojson: FeatureCollection<Point, GeoJsonProperties>;
  radius: number;
  opacity: number;
};

const Heatmap = ({ geojson, radius, opacity }: HeatmapProps) => {
  const map = useMap();
  const visualization = useMapsLibrary('visualization');
  const { filterSet, setFilterSet } = useFilterSet();

  const heatmap = useMemo(() => {
    if (!visualization) return null;

    return new google.maps.visualization.HeatmapLayer({
      radius: radius,
      opacity: opacity,
    });
  }, [visualization, radius, opacity]);

  const filteredFeatures = useMemo(() => {
    if (filterSet.size === 0) return geojson.features;
  
    return geojson.features.filter((point: any) => {
      // Try to get risk factors either directly on the feature or in its properties
      const risks = point.risk_factors || (point.properties && point.properties.risk_factor);
      return risks && risks.some((rf: string) => filterSet.has(rf));
    });
  }, [geojson.features, filterSet]);

  useEffect(() => {
    if (!heatmap) return;

    const heatmapData = filteredFeatures.map((point: any) => {
      const [lng, lat] = point.geometry.coordinates;
      return {
        location: new google.maps.LatLng(lat, lng),
        weight: 4, // default weight if undefined
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