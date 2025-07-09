import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const [attendingRes, createdRes] = await Promise.all([
          axios.get('/api/users/me/events'),
          axios.get('/api/users/me/created-events')
        ]);
        setEvents(attendingRes.data);
        setCreatedEvents(createdRes.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserEvents();
  }, []);

  const handleCancelRsvp = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}/rsvp`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-profile">
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span>{user.name.charAt(0)}</span>
            )}
          </div>
          <div className="user-info">
            <h1>{user.name}</h1>
            <p>{user.role} • {user.department || 'University Member'}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="user-stats">
          <div className="stat-card">
            <h3>{events.length}</h3>
            <p>Events Attending</p>
          </div>
          <div className="stat-card">
            <h3>{createdEvents.length}</h3>
            <p>Events Created</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          My Events
        </button>
        <button
          className={`tab-btn ${activeTab === 'created' ? 'active' : ''}`}
          onClick={() => setActiveTab('created')}
        >
          Created Events
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'upcoming' && (
          <div className="events-section">
            <h2>My Upcoming Events</h2>
            {events.length === 0 ? (
              <div className="no-events">
                <p>You're not attending any events yet.</p>
                <Link to="/events" className="btn btn-primary">
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="events-list">
                {events.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-date">
                      <span className="event-day">
                        {new Date(event.startDate).getDate()}
                      </span>
                      <span className="event-month">
                        {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div className="event-details">
                      <h3>
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                      </h3>
                      <p className="event-time">
                        {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="event-location">{event.location}</p>
                      <div className="event-actions">
                        <Link to={`/events/${event.id}`} className="btn btn-sm btn-outline">
                          View Details
                        </Link>
                        <button
                          onClick={() => handleCancelRsvp(event.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Cancel RSVP
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'created' && (
          <div className="created-events-section">
            <div className="section-header">
              <h2>Events I've Created</h2>
              <Link to="/create-event" className="btn btn-primary">
                Create New Event
              </Link>
            </div>
            {createdEvents.length === 0 ? (
              <div className="no-events">
                <p>You haven't created any events yet.</p>
                <Link to="/create-event" className="btn btn-primary">
                  Create Your First Event
                </Link>
              </div>
            ) : (
              <div className="events-list">
                {createdEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-date">
                      <span className="event-day">
                        {new Date(event.startDate).getDate()}
                      </span>
                      <span className="event-month">
                        {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div className="event-details">
                      <h3>
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                      </h3>
                      <p className="event-time">
                        {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="event-location">{event.location}</p>
                      <div className="event-stats">
                        <span>{event.rsvpCount} attending</span>
                        <span>{event.commentCount} comments</span>
                      </div>
                      <div className="event-actions">
                        <Link to={`/events/${event.id}`} className="btn btn-sm btn-outline">
                          View Details
                        </Link>
                        <Link to={`/events/${event.id}/edit`} className="btn btn-sm btn-outline">
                          Edit Event
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <form className="settings-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" defaultValue={user.name} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={user.email} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select defaultValue={user.role}>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Administrator</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" defaultValue={user.department || ''} />
              </div>
              <div className="form-group">
                <label>Change Password</label>
                <input type="password" placeholder="New Password" />
                <input type="password" placeholder="Confirm New Password" />
              </div>
              <div className="form-group">
                <label>Profile Picture</label>
                <input type="file" accept="image/*" />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;