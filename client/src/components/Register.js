import React, { useState } from 'react';

function Register({ setPage }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://secure-user-authentication-yv6y.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('✅ Registered successfully! Redirecting to login...');
        setTimeout(() => setPage('login'), 2000);
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
        <div style={{fontSize:'60px', textAlign:'center'}}>📝</div>
        <h2>Create Account</h2>
        <p className="subtitle">Join us today for free!</p>
      </div>
      {error && <p className="error">⚠️ {error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="form-group">
        <label>👤 Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
        />
      </div>
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
          placeholder="Create a password"
          onChange={handleChange}
        />
      </div>
      <button className="btn" onClick={handleSubmit}>
        🎉 Create Account
      </button>
      <div className="link-text">
        Already have account?{' '}
        <span onClick={() => setPage('login')}>
          Login Here
        </span>
      </div>
      <div className="security-badge">
        🔒 Your data is safe and encrypted
      </div>
    </div>
  );
}

export default Register;
