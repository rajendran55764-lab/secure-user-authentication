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
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registered successfully! Please login.');
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
      <h2>📝 Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>
      <button className="btn" onClick={handleSubmit}>
        Register
      </button>
      <p style={{textAlign:'center', marginTop:'10px'}}>
        Already have account?{' '}
        <span
          style={{color:'blue', cursor:'pointer'}}
          onClick={() => setPage('login')}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
