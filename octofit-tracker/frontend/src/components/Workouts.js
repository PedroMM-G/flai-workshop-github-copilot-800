import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Workouts component: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-2">Loading workouts...</p>
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
      <h2 className="octofit-page-title">💪 Workouts</h2>
      <div className="row g-3">
        {workouts.length === 0 ? (
          <div className="col"><p className="text-muted">No workouts found.</p></div>
        ) : (
          workouts.map((workout) => (
            <div className="col-12 col-md-6" key={workout._id || workout.id}>
              <div className="card workout-card h-100">
                <div className="card-header">
                  {workout.name}
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">{workout.description}</p>
                  {Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
                    <>
                      <h6 className="fw-semibold mb-2">Exercises</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {workout.exercises.map((ex, i) => (
                          <span key={i} className="badge-exercise">{ex}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Workouts;
