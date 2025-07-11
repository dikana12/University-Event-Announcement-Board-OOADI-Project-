import React, { useContext, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Events from './components/Events';
import Notifications from './components/Notifications';
import EventDetails from './components/EventDetails';
import CreateEvent from './components/CreateEvent';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { AuthContext } from './context/AuthContext';

function AppContent() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  React.useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log('Logout error:', error);
      navigate('/');
    }
  };

  return (
    <div className="App">
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', background: '#fff', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: '1.3rem', color: '#1a237e', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 900, fontSize: '1.5rem', color: '#3949ab' }}>🎓</span>
          UniEventBoard
        </Link>
        {!user ? (
          <>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <span style={{ flex: 1 }}></span>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/events">Events</Link>
            <Link to="/create-event">Create Event</Link>
            <Link to="/notifications">Notifications</Link>
            <span style={{ flex: 1 }}></span>
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(v => !v)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: 0 }}>
                <span style={{ width: 36, height: 36, borderRadius: '50%', background: '#e3e3e3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#3949ab', fontSize: '1.2rem', overflow: 'hidden' }}>
                  {user.avatar ? <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : user.name.charAt(0)}
                </span>
                <span style={{ fontWeight: 600 }}>{user.name}</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="#3949ab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {dropdownOpen && (
                <div style={{ position: 'absolute', right: 0, top: 40, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 8, minWidth: 180, zIndex: 10, padding: '0.5rem 0' }}>
                  <div style={{ padding: '0.5rem 1rem', fontWeight: 500 }}>{user.email}</div>
                  <div style={{ padding: '0.5rem 1rem', color: '#888' }}>{user.role} {user.department && <>• {user.department}</>}</div>
                  <hr style={{ margin: '0.5rem 0', border: 0, borderTop: '1px solid #eee' }} />
                  <button onClick={handleLogout} style={{ width: '100%', background: 'none', border: 'none', color: '#e53935', fontWeight: 600, padding: '0.5rem 1rem', textAlign: 'left', cursor: 'pointer' }}>Logout</button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {user && <Route path="/events" element={<Events />} />}
        {user && <Route path="/events/:id" element={<EventDetails />} />}
        {user && <Route path="/create-event" element={<CreateEvent />} />}
        {user && <Route path="/notifications" element={<Notifications />} />}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
