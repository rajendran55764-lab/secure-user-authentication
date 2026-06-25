import React, { useState, useEffect } from 'react';

function Profile({ token }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          setError(data.msg);
        }
      } catch (err) {
        setError('Server error, please try again');
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="card">
      <h2>👤 Profile</h2>
      {error && <p className="error">{error}</p>}
      {user && (
        <div className="profile-info">
          <p><strong>👤 Username:</strong> {user.username}</p>
          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>🔑 Role:</strong> {user.role}</p>
          <p><strong>📅 Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
