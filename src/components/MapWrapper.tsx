// src/components/MapWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Company } from '../types';
import UtahMap from './UtahMap';

export default function MapWrapper() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    // fetch inside an async IIFE so we can await
    (async () => {
      const { data, error } = await supabase
        .from('company')                                  // no <...> here
        .select('id, name, hq_lat, hq_lon, website');

      if (error) {
        console.error('Supabase error:', error.message);
      } else if (data) {
        // cast the raw `any[]` into your Company[]
        setCompanies(data as Company[]);
      }
    })();
  }, []);

  return <UtahMap companies={companies} />;
}
