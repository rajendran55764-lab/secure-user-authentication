import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setPage('login');
  };

  return (
    <div className="App">
      <nav>
        <h1>🔐 Secure Auth</h1>
        <div>
          {!token ? (
            <>
              <button onClick={() => setPage('login')}>Login</button>
              <button onClick={() => setPage('register')}>Register</button>
            </>
          ) : (
            <>
              <button onClick={() => setPage('profile')}>Profile</button>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      <div className="container">
        {page === 'login' && (
          <Login setToken={setToken} setPage={setPage} />
        )}
        {page === 'register' && (
          <Register setPage={setPage} />
        )}
        {page === 'profile' && (
          <Profile token={token} />
        )}
      </div>
    </div>
  );
}

export default App;
