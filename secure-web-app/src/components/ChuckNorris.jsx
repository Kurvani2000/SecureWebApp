import { useState, useEffect } from 'react';

const ChuckNorris = ({ token, onLogout }) => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('useEffect triggered, token:', token); // Debug token
    const fetchFact = async () => {
      setLoading(true); // Explicitly set loading to true at the start
      try {
        const response = await fetch('http://localhost:3333/fact', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetch response status:', response.status); // Debug status
        const data = await response.json();
        if (response.ok) {
          setFact(data.fact);
          setError('');
        } else {
          setError(data.message || 'Failed to fetch fact');
        }
      } catch (err) {
        setError('Network error');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };
    
    fetchFact();
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3333/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        onLogout();
      } else {
        const data = await response.json();
        setError(data.message || 'Logout failed');
      }
    } catch (err) {
      setError('Logout failed: Network error');
    }
  };

  return (
    <div style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '20px',
        textAlign: 'center'
    }}>
        {loading ? (
            <div style={{
                margin: '20px 0',
                fontSize: '18px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #007bff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                animation: 'spin 1s linear infinite'
            }} />
        ) : error ? (
            <div style={{
                color: 'red',
                padding: '10px',
                backgroundColor: '#ffeeee',
                border: '1px solid #ffcccc',
                borderRadius: '4px'
            }}>
                {error}
            </div>
        ) : (
            <div style={{
                margin: '20px 0',
                padding: '20px',
                border: '1px solid #eee',
                borderRadius: '8px',
                backgroundColor: '#f9f3f9',
                fontSize: '18px',
                lineHeight: '1.6'
            }}>
                {fact}
            </div>
        )}

        <button onClick={handleLogout} style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
        }}>
            Logout
        </button>
    </div>
  );
};

export default ChuckNorris;