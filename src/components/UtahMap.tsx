/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Company } from '../types';    // ← same shared type

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Patch default icons
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

export default function UtahMap({ companies }: { companies: Company[] }) {
  const center: LatLngExpression = [39.5, -111.5];

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
    >
      <ResizeFixer />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {companies.map((c) => (
        <Marker key={c.id} position={[c.hq_lat, c.hq_lon] as LatLngExpression}>
          <Popup
            closeButton
            closeOnClick={false}
            autoClose={false}
            className="text-center"
          >
            <strong>{c.name}</strong>
            {c.website && (
              <p style={{ margin: '0.5rem 0 0' }}>
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0066cc', textDecoration: 'underline' }}
                >
                  {c.website}
                </a>
              </p>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
