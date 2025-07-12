import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    bio: 'Passionate university member dedicated to creating and participating in meaningful campus events.',
    phone: '+1 (555) 123-4567',
    location: 'University Campus',
    website: 'https://unieventboard.com'
  });

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile updated:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      department: user?.department || '',
      bio: 'Passionate university member dedicated to creating and participating in meaningful campus events.',
      phone: '+1 (555) 123-4567',
      location: 'University Campus',
      website: 'https://unieventboard.com'
    });
  };

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Please log in to view your profile.
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
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: 'white',
          position: 'relative'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            fontWeight: 'bold',
            border: '4px solid rgba(255, 255, 255, 0.3)'
          }}>
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {user.name}
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '1rem' }}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {user.department || 'University Member'}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>24</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Events Created</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>156</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Events Attended</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>89</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Days Active</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e1e5e9',
          background: '#f8f9fa'
        }}>
          {[
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'events', label: 'My Events', icon: '📅' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
            { id: 'activity', label: 'Activity', icon: '📊' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === tab.id ? '#667eea' : 'transparent',
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
          {activeTab === 'profile' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600' }}>
                  Profile Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    background: isEditing ? '#e74c3c' : '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#2d3142',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa',
                      color: isEditing ? '#2d3142' : '#666'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#2d3142',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa',
                      color: isEditing ? '#2d3142' : '#666'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#2d3142',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={profileData.department}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa',
                      color: isEditing ? '#2d3142' : '#666'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#2d3142',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa',
                      color: isEditing ? '#2d3142' : '#666'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#2d3142',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      background: isEditing ? 'white' : '#f8f9fa',
                      color: isEditing ? '#2d3142' : '#666',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              {isEditing && (
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '2rem',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={handleCancel}
                    style={{
                      background: '#6c757d',
                      color: 'white',
                      border: 'none',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
                My Events
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e1e5e9'
                  }}>
                    <h3 style={{ color: '#2d3142', marginBottom: '0.5rem' }}>
                      Sample Event {i}
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      This is a sample event created by you. Click to view details.
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        Active
                      </span>
                      <button style={{
                        background: 'transparent',
                        border: '1px solid #667eea',
                        color: '#667eea',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
                Account Settings
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid #e1e5e9'
                }}>
                  <h3 style={{ color: '#2d3142', marginBottom: '1rem' }}>Notifications</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span>Email Notifications</span>
                    <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span>Event Reminders</span>
                    <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Weekly Digest</span>
                    <input type="checkbox" style={{ transform: 'scale(1.2)' }} />
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid #e1e5e9'
                }}>
                  <h3 style={{ color: '#2d3142', marginBottom: '1rem' }}>Privacy</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span>Public Profile</span>
                    <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Show Activity</span>
                    <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h2 style={{ color: '#2d3142', fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
                Recent Activity
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { action: 'Created event', title: 'Spring Festival 2024', time: '2 hours ago' },
                  { action: 'Attended event', title: 'Career Fair', time: '1 day ago' },
                  { action: 'Updated profile', title: 'Profile information', time: '3 days ago' },
                  { action: 'Joined event', title: 'Study Group Session', time: '1 week ago' }
                ].map((activity, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '1rem',
                    border: '1px solid #e1e5e9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ color: '#667eea', fontWeight: '600' }}>{activity.action}</span>
                      <span style={{ color: '#666', marginLeft: '0.5rem' }}>{activity.title}</span>
                    </div>
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 