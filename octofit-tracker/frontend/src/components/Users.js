import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users component: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-2">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="octofit-page-title">👤 Users</h2>
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>All Users</span>
          <span className="badge bg-light text-dark">{users.length} total</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted py-3">No users found.</td></tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={user._id || user.id || user.username}>
                      <td className="text-muted">{idx + 1}</td>
                      <td className="fw-semibold">{user.name || user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td><span className="badge rounded-pill bg-secondary">{user.team || '—'}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
