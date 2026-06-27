import React, { useState } from 'react';

function Login({ setToken, setPage, handleLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://secure-user-authentication-yv6y.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        // Decode token to get role
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        handleLogin(data.token, payload.role);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Server error, please try again');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div style={{fontSize:'60px', textAlign:'center'}}>🔐</div>
        <h2>Welcome Back!</h2>
        <p className="subtitle">Login to your secure account</p>
      </div>
      {error && <p className="error">⚠️ {error}</p>}
      <div className="form-group">
        <label>📧 Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>🔒 Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
      </div>
      <button className="btn" onClick={handleSubmit}>
        🚀 Login Now
      </button>
      <div className="link-text">
        Don't have account?{' '}
        <span onClick={() => setPage('register')}>
          Register Here
        </span>
      </div>
      <div className="security-badge">
        🔒 Secured with JWT Authentication
      </div>
    </div>
  );
}

export default Login;
