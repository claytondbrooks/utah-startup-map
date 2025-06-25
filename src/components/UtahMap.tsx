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

// Fix marker icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

function ResizeFixer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 200);
  }, [map]);
  return null;
}

export default function UtahMap({
  companies,
}: {
  companies: { id: string; name: string; hq_lat: number; hq_lon: number }[];
}) {
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
      {companies.map((c) => (
        <Marker
          key={c.id}
          position={[c.hq_lat, c.hq_lon] as LatLngExpression}
        >
          <Tooltip>{c.name}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
