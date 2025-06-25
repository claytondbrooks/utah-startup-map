'use client';

import dynamic from 'next/dynamic';

// Import the client-only wrapper, not UtahMap directly
const MapWrapper = dynamic(() => import('@/components/MapWrapper'), {
  ssr: false,
});

export default function Home() {
  return (
    <main
      style={{
        backgroundColor: '#FFEBCD',
        minHeight: '100vh',
        margin: 0,
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>
          Utah Startup Map
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#4A5568', marginTop: '0.5rem' }}>
          Explore Utah’s tech startup ecosystem. Hover map markers for info.
        </p>
      </div>

      {/* Centered Map */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '700px',
          margin: '0 auto',
        }}
      >
        {/* Use MapWrapper here */}
        <MapWrapper />
      </div>
    </main>
  );
}
