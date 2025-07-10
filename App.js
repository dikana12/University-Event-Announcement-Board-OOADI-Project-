import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import FileUpload from './pages/FileUpload';
import CalendarView from './pages/CalendarView';
import NotFound from './pages/NotFound';

// Context 

// Styles
import './styles/main.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check');
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <AuthProvider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/create-event" 
                element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/upload" 
                element={isAuthenticated ? <FileUpload /> : <Navigate to="/login" />} 
              />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© {new Date().getFullYear()} University Event Announcement Board</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;