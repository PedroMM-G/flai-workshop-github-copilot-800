import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Workouts from './components/Workouts';

const NAV_ITEMS = [
  { path: '/users',       label: 'Users',       icon: '\ud83d\udc64' },
  { path: '/activities',  label: 'Activities',  icon: '\ud83c\udfcb\ufe0f' },
  { path: '/teams',       label: 'Teams',       icon: '\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1' },
  { path: '/workouts',    label: 'Workouts',    icon: '\ud83d\udcaa' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '\ud83c\udfc6' },
];

function Home() {
  return (
    <>
      {/* Full-width hero banner */}
      <div className="octofit-hero">
        <img
          src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
          alt="OctoFit"
          className="hero-logo"
        />
        <h1>Welcome to OctoFit Tracker 💪</h1>
        <p className="lead">
          Track your fitness activities, compete with teams, and climb the leaderboard!
        </p>
        <div>
          <NavLink to="/leaderboard" className="btn btn-octofit me-2">View Leaderboard</NavLink>
          <NavLink to="/activities" className="btn btn-outline-dark">Log Activity</NavLink>
        </div>
      </div>

      {/* Quick-nav cards */}
      <div className="container mb-5">
      <div className="row g-3">
        {NAV_ITEMS.map(({ path, label, icon }) => (
          <div className="col-6 col-md-4 col-lg" key={path}>
            <Link to={path} className="text-decoration-none">
              <div className="card stat-card text-center p-3 h-100">
                <div className="stat-icon">{icon}</div>
                <div className="fw-semibold mt-2">{label}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="OctoFit logo"
            />
            OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {NAV_ITEMS.map(({ path, label }) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to={path}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="pb-5">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/users"      element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams"      element={<Teams />} />
          <Route path="/workouts"   element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
