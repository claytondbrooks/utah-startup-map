'use client';

import dynamic from 'next/dynamic';

// Dynamic import for client-only map
const UtahMap = dynamic(() => import('@/components/UtahMap'), { ssr: false });

export default function Home() {
  return (
    <main
      style={{
        backgroundColor: '#FFEBCD',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Title Container */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',       // force-center text
          padding: '2rem 1rem 1rem',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            margin: 0,
          }}
        >
          Utah Startup Map
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            color: '#4A5568',
            margin: '0.5rem 0 0',
          }}
        >
          Explore Utah’s startup ecosystem. Hover map markers for names.
        </p>
      </div>

      {/* Map Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: 'calc(100vh - 6rem)', // subtract the title block height
          margin: '0 auto',
        }}
      >
        <UtahMap />
      </div>
    </main>
  );
}
