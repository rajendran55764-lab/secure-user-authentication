import React, { useState, useEffect } from 'react';

function Dashboard({ token }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('https://secure-user-authentication-yv6y.onrender.com/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setUsername(data.username);
        }
      } catch (err) {
        setError('Server error');
      }
    };
    fetchProfile();
  }, [token]);

  const updateProfile = async () => {
    try {
      const res = await fetch('https://secure-user-authentication-yv6y.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Profile updated successfully!');
        setUser(data);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div style={{fontSize:'60px', textAlign:'center'}}>📊</div>
        <h2>Dashboard</h2>
        <p className="subtitle">Welcome back, {user?.username}!</p>
      </div>
      {error && <p className="error">⚠️ {error}</p>}
      {success && <p className="success">✅ {success}</p>}

      {/* Stats Section */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'1fr 1fr',
        gap:'15px',
        marginBottom:'25px'
      }}>
        <div style={{
          background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding:'20px',
          borderRadius:'15px',
          color:'white',
          textAlign:'center'
        }}>
          <div style={{fontSize:'30px'}}>👤</div>
          <p style={{fontSize:'14px', marginTop:'5px'}}>Account Type</p>
          <p style={{fontWeight:'700', fontSize:'18px'}}>{user?.role}</p>
        </div>
        <div style={{
          background:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding:'20px',
          borderRadius:'15px',
          color:'white',
          textAlign:'center'
        }}>
          <div style={{fontSize:'30px'}}>📅</div>
          <p style={{fontSize:'14px', marginTop:'5px'}}>Member Since</p>
          <p style={{fontWeight:'700', fontSize:'14px'}}>
            {user ? new Date(user.createdAt).toLocaleDateString() : ''}
          </p>
        </div>
        <div style={{
          background:'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding:'20px',
          borderRadius:'15px',
          color:'white',
          textAlign:'center'
        }}>
          <div style={{fontSize:'30px'}}>📧</div>
          <p style={{fontSize:'14px', marginTop:'5px'}}>Email</p>
          <p style={{fontWeight:'700', fontSize:'12px'}}>{user?.email}</p>
        </div>
        <div style={{
          background:'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          padding:'20px',
          borderRadius:'15px',
          color:'white',
          textAlign:'center'
        }}>
          <div style={{fontSize:'30px'}}>✅</div>
          <p style={{fontSize:'14px', marginTop:'5px'}}>Status</p>
          <p style={{fontWeight:'700', fontSize:'18px'}}>Active</p>
        </div>
      </div>

      {/* Update Profile Section */}
      <div style={{
        background:'#f8f9fa',
        padding:'20px',
        borderRadius:'15px'
      }}>
        <h3 style={{marginBottom:'15px', color:'#333'}}>⚙️ Update Profile</h3>
        <div className="form-group">
          <label>👤 Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username"
          />
        </div>
        <button className="btn" onClick={updateProfile}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
