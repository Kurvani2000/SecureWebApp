import { useState, useEffect } from 'react';

const ChuckNorris = ({ token, onLogout }) => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch('http://localhost:3333/fact', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = await response.json();
        if (response.ok) {
          setFact(data.fact);
        } else {
          setError(data.message || 'Failed to fetch fact');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFact();
  }, [token]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3333/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      onLogout();
    } catch (err) {
      console.error('Logout failed:', err);
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
                fontSize: '18px'
            }}>
                Loading...
            </div>
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
                backgroundColor: '#f9f9f9',
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