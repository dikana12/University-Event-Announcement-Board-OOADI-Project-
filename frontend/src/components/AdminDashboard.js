import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@university.edu', role: 'student', department: 'Computer Science', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@university.edu', role: 'teacher', department: 'Mathematics', status: 'active' },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@university.edu', role: 'student', department: 'Physics', status: 'pending' },
    { id: 4, name: 'Emily Wilson', email: 'emily.wilson@university.edu', role: 'admin', department: 'Administration', status: 'active' }
  ]);
  const [recentEvents, setRecentEvents] = useState([
    { id: 1, title: 'Spring Festival 2024', organizer: 'Student Council', department: 'Student Affairs', status: 'approved', attendees: 156 },
    { id: 2, title: 'Career Fair', organizer: 'Career Services', department: 'Student Affairs', status: 'pending', attendees: 89 },
    { id: 3, title: 'Research Symposium', organizer: 'Physics Department', department: 'Physics', status: 'approved', attendees: 234 },
    { id: 4, title: 'Alumni Meet', organizer: 'Alumni Association', department: 'External Relations', status: 'pending', attendees: 67 }
  ]);
  const stats = {
    totalUsers: 1247,
    totalEvents: 89,
    activeEvents: 23,
    pendingApprovals: 7,
    totalDepartments: 12,
    systemHealth: 'Excellent'
  };
  const systemAlerts = [
    { id: 1, type: 'info', message: 'System backup completed successfully', time: '2 hours ago' },
    { id: 2, type: 'warning', message: 'High server load detected', time: '4 hours ago' },
    { id: 3, type: 'success', message: 'New user registration system deployed', time: '1 day ago' }
  ];

  // Mock approve/decline/accept handlers
  const handleApproveUser = (id) => {
    setRecentUsers(users => users.map(u => u.id === id ? { ...u, status: 'active' } : u));
  };
  const handleDeclineUser = (id) => {
    setRecentUsers(users => users.filter(u => u.id !== id));
  };
  const handleApproveEvent = (id) => {
    setRecentEvents(events => events.map(e => e.id === id ? { ...e, status: 'approved' } : e));
  };
  const handleDeclineEvent = (id) => {
    setRecentEvents(events => events.filter(e => e.id !== id));
  };

  if (!user || user.role !== 'admin') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Access denied. Admin privileges required.
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(45deg, #2c3e50, #34495e)',
          padding: '2rem',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Admin Dashboard
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              Welcome back, {user.name} • System Status: {stats.systemHealth}
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 1.5rem',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.pendingApprovals}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Pending Approvals</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e1e5e9',
          background: '#f8f9fa'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'users', label: 'User Management', icon: '👥' },
            { id: 'events', label: 'Event Management', icon: '📅' },
            { id: 'system', label: 'System', icon: '⚙️' },
            { id: 'reports', label: 'Reports', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === tab.id ? '#2c3e50' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div style={{ padding: '2rem' }}>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
                System Overview
              </h2>
              
              {/* Statistics Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {[
                  { title: 'Total Users', value: stats.totalUsers, icon: '👥', color: '#3498db' },
                  { title: 'Total Events', value: stats.totalEvents, icon: '📅', color: '#e74c3c' },
                  { title: 'Active Events', value: stats.activeEvents, icon: '✅', color: '#27ae60' },
                  { title: 'Departments', value: stats.totalDepartments, icon: '🏢', color: '#f39c12' }
                ].map((stat, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e1e5e9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '15px',
                      background: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem'
                    }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3142' }}>
                        {stat.value}
                      </div>
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>
                        {stat.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e1e5e9'
                }}>
                  <h3 style={{ color: '#2d3142', marginBottom: '1rem', fontSize: '1.3rem' }}>
                    Recent Users
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {recentUsers.slice(0, 4).map(user => (
                      <div key={user.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.8rem',
                        background: '#f8f9fa',
                        borderRadius: '10px'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#2d3142' }}>{user.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>{user.email}</div>
                        </div>
                        <div style={{
                          background: user.status === 'active' ? '#27ae60' : '#f39c12',
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {user.status}
                        </div>
                        {user.status === 'pending' && (
                          <>
                            <button onClick={() => handleApproveUser(user.id)} style={{
                              background: '#27ae60',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '15px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              marginLeft: '0.5rem'
                            }}>Accept</button>
                            <button onClick={() => handleDeclineUser(user.id)} style={{
                              background: '#e74c3c',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '15px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              marginLeft: '0.5rem'
                            }}>Decline</button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e1e5e9'
                }}>
                  <h3 style={{ color: '#2d3142', marginBottom: '1rem', fontSize: '1.3rem' }}>
                    Recent Events
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {recentEvents.slice(0, 4).map(event => (
                      <div key={event.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.8rem',
                        background: '#f8f9fa',
                        borderRadius: '10px'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#2d3142' }}>{event.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>{event.organizer}</div>
                        </div>
                        <div style={{
                          background: event.status === 'approved' ? '#27ae60' : '#f39c12',
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {event.status}
                        </div>
                        {event.status === 'pending' && (
                          <>
                            <button onClick={() => handleApproveEvent(event.id)} style={{
                              background: '#27ae60',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '15px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              marginLeft: '0.5rem'
                            }}>Approve</button>
                            <button onClick={() => handleDeclineEvent(event.id)} style={{
                              background: '#e74c3c',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '15px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              marginLeft: '0.5rem'
                            }}>Decline</button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
                User Management
              </h2>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e1e5e9'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <input
                    type="text"
                    placeholder="Search users..."
                    style={{
                      padding: '0.8rem',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      width: '300px',
                      fontSize: '1rem'
                    }}
                  />
                  <button style={{
                    background: '#27ae60',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    Add User
                  </button>
                </div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e1e5e9' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Name</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Email</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Role</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Department</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #e1e5e9' }}>
                        <td style={{ padding: '1rem' }}>{user.name}</td>
                        <td style={{ padding: '1rem' }}>{user.email}</td>
                        <td style={{ padding: '1rem' }}>{user.role}</td>
                        <td style={{ padding: '1rem' }}>{user.department}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            background: user.status === 'active' ? '#27ae60' : '#f39c12',
                            color: 'white',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {user.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button style={{
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            marginRight: '0.5rem'
                          }}>
                            Edit
                          </button>
                          <button style={{
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
                Event Management
              </h2>
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e1e5e9'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <input
                    type="text"
                    placeholder="Search events..."
                    style={{
                      padding: '0.8rem',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      width: '300px',
                      fontSize: '1rem'
                    }}
                  />
                  <button style={{
                    background: '#27ae60',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    Create Event
                  </button>
                </div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e1e5e9' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Event</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Organizer</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Department</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Attendees</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#2d3142' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map(event => (
                      <tr key={event.id} style={{ borderBottom: '1px solid #e1e5e9' }}>
                        <td style={{ padding: '1rem' }}>{event.title}</td>
                        <td style={{ padding: '1rem' }}>{event.organizer}</td>
                        <td style={{ padding: '1rem' }}>{event.department}</td>
                        <td style={{ padding: '1rem' }}>{event.attendees}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            background: event.status === 'approved' ? '#27ae60' : '#f39c12',
                            color: 'white',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {event.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button style={{
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            marginRight: '0.5rem'
                          }}>
                            View
                          </button>
                          <button style={{
                            background: '#f39c12',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            marginRight: '0.5rem'
                          }}>
                            Edit
                          </button>
                          <button style={{
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
                System Management
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e1e5e9'
                }}>
                  <h3 style={{ color: '#2d3142', marginBottom: '1rem' }}>System Alerts</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {systemAlerts.map(alert => (
                      <div key={alert.id} style={{
                        padding: '1rem',
                        background: alert.type === 'warning' ? '#fff3cd' : 
                                   alert.type === 'success' ? '#d4edda' : '#d1ecf1',
                        borderRadius: '10px',
                        border: `1px solid ${
                          alert.type === 'warning' ? '#ffeaa7' : 
                          alert.type === 'success' ? '#c3e6cb' : '#bee5eb'
                        }`
                      }}>
                        <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>
                          {alert.message}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                          {alert.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e1e5e9'
                }}>
                  <h3 style={{ color: '#2d3142', marginBottom: '1rem' }}>Quick Actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button style={{
                      background: '#3498db',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      textAlign: 'left'
                    }}>
                      🔄 Backup Database
                    </button>
                    <button style={{
                      background: '#27ae60',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      textAlign: 'left'
                    }}>
                      📧 Send System Notification
                    </button>
                    <button style={{
                      background: '#f39c12',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      textAlign: 'left'
                    }}>
                      📊 Generate Report
                    </button>
                    <button style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      textAlign: 'left'
                    }}>
                      🔧 System Maintenance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
                Reports & Analytics
              </h2>
              
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e1e5e9'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ color: '#2d3142' }}>Generate Reports</h3>
                  <button style={{
                    background: '#27ae60',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    Export Data
                  </button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                    <div style={{ fontWeight: '600', color: '#2d3142' }}>User Activity</div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                    <div style={{ fontWeight: '600', color: '#2d3142' }}>Event Analytics</div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
                    <div style={{ fontWeight: '600', color: '#2d3142' }}>Department Stats</div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
                    <div style={{ fontWeight: '600', color: '#2d3142' }}>System Performance</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 