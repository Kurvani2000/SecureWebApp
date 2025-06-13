import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    if (!username.includes('@')) {
      setError('Username must be a valid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    
    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      if (response.ok && data.uuid) {
        onLogin(data.uuid);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div style ={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px'
    }}>
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={{
                    padding: '8px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            ></input>
            <input>
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{
                    padding: '8px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            </input>
            {error && <div style={{
                color: 'red',
                padding: '8px',
                backgroundColor: '#ffeeee',
                border: '1px solid #ffcccc',
                borderRadius: '4px'
                }}>
            {error}</div>}
            <button type="submit" style={{
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
                }}>
                Login
            </button>
        </form>
    </div>
  );
};