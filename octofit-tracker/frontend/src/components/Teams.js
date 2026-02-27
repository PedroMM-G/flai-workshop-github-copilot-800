import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams component: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-2">Loading teams...</p>
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
      <h2 className="octofit-page-title">🧑‍🤝‍🧑 Teams</h2>
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>All Teams</span>
          <span className="badge bg-light text-dark">{teams.length} teams</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-3">No teams found.</td></tr>
                ) : (
                  teams.map((team, idx) => (
                    <tr key={team._id || team.id || idx}>
                      <td className="text-muted">{idx + 1}</td>
                      <td className="fw-semibold">{team.name}</td>
                      <td>
                        {Array.isArray(team.members)
                          ? team.members.map((m, i) => (
                              <span key={i} className="badge rounded-pill bg-secondary me-1">{m}</span>
                            ))
                          : team.members}
                      </td>
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

export default Teams;
