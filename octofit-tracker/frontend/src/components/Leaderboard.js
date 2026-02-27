import React, { useState, useEffect } from 'react';

const rankClass = (rank) => {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return '';
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard component: fetched data', data);
        const list = Array.isArray(data) ? data : data.results || [];
        // Sort descending by score
        list.sort((a, b) => (b.score || 0) - (a.score || 0));
        setEntries(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-2">Loading leaderboard...</p>
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
      <h2 className="octofit-page-title">🏆 Leaderboard</h2>
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Top Scores</span>
          <span className="badge bg-light text-dark">{entries.length} athletes</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-3">No entries found.</td></tr>
                ) : (
                  entries.map((entry, idx) => {
                    const rank = idx + 1;
                    return (
                      <tr key={entry._id || entry.id || idx}>
                        <td>
                          <span className={`rank-badge ${rankClass(rank)}`}>{rank}</span>
                        </td>
                        <td className="fw-semibold">{entry.user}</td>
                        <td>
                          <span className="badge bg-success fs-6 px-3">{entry.score}</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
