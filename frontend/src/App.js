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
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
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
            <Link to="/about" style={{ 
              textDecoration: 'none', 
              color: '#3949ab', 
              fontWeight: 600, 
              padding: '0.6rem 1.2rem', 
              borderRadius: '25px', 
              border: '2px solid #3949ab', 
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent',
              fontSize: '0.9rem',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3949ab';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(57, 73, 171, 0.3)';
            }} onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#3949ab';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>About Us</Link>
            <Link to="/contact" style={{ 
              textDecoration: 'none', 
              color: '#ef8354', 
              fontWeight: 600, 
              padding: '0.6rem 1.2rem', 
              borderRadius: '25px', 
              border: '2px solid #ef8354', 
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent',
              fontSize: '0.9rem',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ef8354';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(239, 131, 84, 0.3)';
            }} onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#ef8354';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>Contact Us</Link>
            <span style={{ flex: 1 }}></span>
            <Link to="/login" style={{ 
              textDecoration: 'none', 
              color: '#fff', 
              fontWeight: 600, 
              padding: '0.6rem 1.2rem', 
              borderRadius: '25px', 
              border: '2px solid #3949ab', 
              backgroundColor: '#3949ab',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(57, 73, 171, 0.3)',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 16px rgba(57, 73, 171, 0.4)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(57, 73, 171, 0.3)';
            }}>Login</Link>
            <Link to="/register" style={{ 
              textDecoration: 'none', 
              color: '#fff', 
              fontWeight: 600, 
              padding: '0.6rem 1.2rem', 
              borderRadius: '25px', 
              border: '2px solid #ef8354', 
              backgroundColor: '#ef8354',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(239, 131, 84, 0.3)',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 16px rgba(239, 131, 84, 0.4)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(239, 131, 84, 0.3)';
            }}>Register</Link>
          </>
        ) : (
          <>
            {user.role === 'admin' ? (
              <>
                <Link to="/admin-dashboard">Dashboard</Link>
                <span style={{ flex: 1 }}></span>
              </>
            ) : (
              <>
                <Link to="/events">Events</Link>
                <Link to="/create-event">Create Event</Link>
                <Link to="/notifications">Notifications</Link>
                <span style={{ flex: 1 }}></span>
              </>
            )}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
                              <button onClick={() => setDropdownOpen(v => !v)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: 0 }}>
                  <span 
                    onClick={() => navigate('/profile')}
                    style={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: '50%', 
                      background: '#e3e3e3', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 700, 
                      color: '#3949ab', 
                      fontSize: '1.2rem', 
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.1)';
                      e.target.style.boxShadow = '0 2px 8px rgba(57, 73, 171, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
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
                  <button onClick={() => navigate('/profile')} style={{ width: '100%', background: 'none', border: 'none', color: '#3949ab', fontWeight: 600, padding: '0.5rem 1rem', textAlign: 'left', cursor: 'pointer' }}>Profile</button>
                  <button onClick={handleLogout} style={{ width: '100%', background: 'none', border: 'none', color: '#e53935', fontWeight: 600, padding: '0.5rem 1rem', textAlign: 'left', cursor: 'pointer' }}>Logout</button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={
          !user ? <Home /> : 
          user.role === 'admin' ? <AdminDashboard /> : <Dashboard />
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {user && user.role !== 'admin' && <Route path="/events" element={<Events />} />}
        {user && user.role !== 'admin' && <Route path="/events/:id" element={<EventDetails />} />}
        {user && user.role !== 'admin' && <Route path="/create-event" element={<CreateEvent />} />}
        {user && user.role !== 'admin' && <Route path="/notifications" element={<Notifications />} />}
        {user && user.role !== 'admin' && <Route path="/profile" element={<Profile />} />}
        {user && user.role === 'admin' && <Route path="/admin-dashboard" element={<AdminDashboard />} />}
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
