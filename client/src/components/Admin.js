import React, { useState, useEffect } from 'react';

function Admin({ token }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://secure-user-authentication-yv6y.onrender.com/api/auth/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`https://secure-user-authentication-yv6y.onrender.com/api/auth/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSuccess('User deleted successfully!');
        fetchUsers();
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const changeRole = async (id, role) => {
    try {
      const res = await fetch(`https://secure-user-authentication-yv6y.onrender.com/api/auth/users/${id}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role })
      });
      if (res.ok) {
        setSuccess('Role updated successfully!');
        fetchUsers();
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="card" style={{maxWidth:'800px', margin:'0 auto'}}>
      <div className="card-header">
        <div style={{fontSize:'60px', textAlign:'center'}}>👑</div>
        <h2>Admin Panel</h2>
        <p className="subtitle">Manage all users</p>
      </div>
      {error && <p className="error">⚠️ {error}</p>}
      {success && <p className="success">✅ {success}</p>}
      
      <div style={{
        background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding:'15px',
        borderRadius:'10px',
        color:'white',
        textAlign:'center',
        marginBottom:'20px'
      }}>
        <h3>Total Users: {users.length}</h3>
      </div>

      {users.map(user => (
        <div key={user._id} style={{
          background:'#f8f9fa',
          padding:'15px',
          borderRadius:'10px',
          marginBottom:'15px',
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          flexWrap:'wrap',
          gap:'10px'
        }}>
          <div>
            <p><strong>👤 {user.username}</strong></p>
            <p style={{color:'#666', fontSize:'14px'}}>📧 {user.email}</p>
            <p style={{color:'#666', fontSize:'14px'}}>🔑 Role: {user.role}</p>
          </div>
          <div style={{display:'flex', gap:'10px'}}>
            <button
              onClick={() => changeRole(user._id, user.role === 'admin' ? 'user' : 'admin')}
              style={{
                padding:'8px 15px',
                background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color:'white',
                border:'none',
                borderRadius:'8px',
                cursor:'pointer',
                fontSize:'13px'
              }}
            >
              {user.role === 'admin' ? '👤 Make User' : '👑 Make Admin'}
            </button>
            <button
              onClick={() => deleteUser(user._id)}
              style={{
                padding:'8px 15px',
                background:'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                color:'white',
                border:'none',
                borderRadius:'8px',
                cursor:'pointer',
                fontSize:'13px'
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;
