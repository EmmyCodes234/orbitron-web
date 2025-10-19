import React, { useEffect, useState } from 'react';
import { supabase } from '../src/supabaseClient';

const SupabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...');
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { data, error } = await supabase
          .from('players')
          .select('count', { count: 'exact' })
          .limit(1);

        if (error) {
          setError(error.message);
          setConnectionStatus('❌ Connection Failed');
        } else {
          setConnectionStatus('✅ Connected');
          
          // Get actual count
          const { count } = await supabase
            .from('players')
            .select('*', { count: 'exact', head: true });
          
          setPlayerCount(count || 0);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setConnectionStatus('❌ Connection Failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div><strong>Supabase Status:</strong> {connectionStatus}</div>
      <div><strong>Players in DB:</strong> {playerCount}</div>
      <div><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</div>
      <div><strong>Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</div>
      {error && <div style={{ color: 'red' }}><strong>Error:</strong> {error}</div>}
    </div>
  );
};

export default SupabaseTest;