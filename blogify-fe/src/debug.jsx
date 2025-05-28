import { useState, useEffect } from "react";

// This is a debugging component to check environment variables
const DebugComponent = () => {
  const [debugInfo, setDebugInfo] = useState({
    apiUrl: "",
    firebaseConfig: {}
  });

  useEffect(() => {
    // Collect environment variables
    const apiUrl = import.meta.env.VITE_API_URL;
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    setDebugInfo({
      apiUrl,
      firebaseConfig
    });
  }, []);

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Debug Information</h2>
      <div>
        <h3>API URL:</h3>
        <pre>{debugInfo.apiUrl || "Not set"}</pre>

        <h3>Firebase Config:</h3>
        <pre>{JSON.stringify(debugInfo.firebaseConfig, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DebugComponent;
