'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import UtahMap from './UtahMap';

type Company = {
  id: string;
  name: string;
  hq_lat: number;
  hq_lon: number;
};

export default function MapWrapper() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    supabase
      .from('company')
      .select('id, name, hq_lat, hq_lon')
      .then(({ data, error }) => {
        if (error) {
          console.error('Supabase error:', error.message);
        } else {
          setCompanies(data ?? []);
        }
      });
  }, []);

  return <UtahMap companies={companies} />;
}
