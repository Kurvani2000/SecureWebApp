import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ChuckNorris from './components/ChuckNorris';

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = (uuid) => {
    setToken(uuid);
    setError('');
  };

  const handleLogout = () => {
    setToken(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Web Application Security Lab</h1>
      {error && (
        <p style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffeeee', border: '1px solid #ffcccc', borderRadius: '4px' }}>
          {error}
        </p>
      )}
      {token ? (
        <ChuckNorris token={token} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;