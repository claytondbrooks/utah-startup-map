/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Patch icon paths
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const companies = [
  { name: 'FrameVC', location: [40.6333, -111.8139] },
  { name: 'Halda.AI', location: [40.2264, -111.6611] },
  { name: 'Vector', location: [40.4835, -111.8925] },
];

function ResizeFixer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 200);
  }, [map]);
  return null;
}

export default function UtahMap() {
  const center: LatLngExpression = [39.5, -111.5];

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <ResizeFixer />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {companies.map((company, idx) => (
        <Marker key={idx} position={company.location as LatLngExpression}>
          <Tooltip>{company.name}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
