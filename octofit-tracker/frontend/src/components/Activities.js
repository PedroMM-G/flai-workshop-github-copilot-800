import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities component: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-2">Loading activities...</p>
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
      <h2 className="octofit-page-title">🏋️ Activities</h2>
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Logged Activities</span>
          <span className="badge bg-light text-dark">{activities.length} total</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted py-3">No activities found.</td></tr>
                ) : (
                  activities.map((activity, idx) => (
                    <tr key={activity._id || activity.id || idx}>
                      <td className="text-muted">{idx + 1}</td>
                      <td className="fw-semibold">{activity.user}</td>
                      <td><span className="badge rounded-pill bg-success">{activity.activity_type}</span></td>
                      <td>{activity.duration}</td>
                      <td>{activity.date || '—'}</td>
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

export default Activities;
