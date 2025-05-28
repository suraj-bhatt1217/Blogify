import { useEffect, useState } from 'react';

const CheckEnvironment = () => {
  const [envVars, setEnvVars] = useState({});

  useEffect(() => {
    const vars = {
      VITE_API_URL: import.meta.env.VITE_API_URL || 'Fallback: http://localhost:3000',
      VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || 'Not set',
      VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'Not set',
      // Add other environment variables as needed
    };
    
    setEnvVars(vars);
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '5px' }}>
      <h2>Environment Variables Check</h2>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
        {JSON.stringify(envVars, null, 2)}
      </pre>
    </div>
  );
};

export default CheckEnvironment;
