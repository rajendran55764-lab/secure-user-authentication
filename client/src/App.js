import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    setPage('login');
  };

  const handleLogin = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setToken(token);
    setRole(userRole);
    setPage('dashboard');
  };

  return (
    <div className="App">
      <nav>
        <h1>🔐 Secure Auth</h1>
        <div>
          {!token ? (
            <>
              <button onClick={() => setPage('login')}>
                🔑 Login
              </button>
              <button onClick={() => setPage('register')}>
                📝 Register
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setPage('dashboard')}>
                📊 Dashboard
              </button>
              <button onClick={() => setPage('profile')}>
                👤 Profile
              </button>
              {role === 'admin' && (
                <button onClick={() => setPage('admin')}>
                  👑 Admin
                </button>
              )}
              <button onClick={logout}>
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="container" style={{maxWidth: page === 'admin' ? '900px' : '450px'}}>
        {page === 'login' && (
          <Login setToken={setToken} setPage={setPage} handleLogin={handleLogin} />
        )}
        {page === 'register' && (
          <Register setPage={setPage} />
        )}
        {page === 'profile' && (
          <Profile token={token} />
        )}
        {page === 'dashboard' && (
          <Dashboard token={token} />
        )}
        {page === 'admin' && role === 'admin' && (
          <Admin token={token} />
        )}
      </div>
    </div>
  );
}

export default App;
