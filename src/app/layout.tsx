import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Utah Market Map',
  description: 'Explore startups and tech companies in Utah',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
