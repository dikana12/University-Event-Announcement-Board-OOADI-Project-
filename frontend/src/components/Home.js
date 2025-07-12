import React from 'react';
import { Link } from 'react-router-dom';

const bgUrl = 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80'; // University students at campus event/meeting

const accentYellow = '#ffd600';
const deepBlue = '#2d3142';
const coral = '#ef8354';
const mint = '#3fc1c9';

const Home = () => (
  <div style={{
    minHeight: '100vh',
    background: `linear-gradient(120deg, rgba(34,40,49,0.85) 60%, rgba(63,193,201,0.8) 100%), url(${bgUrl}) center/cover no-repeat`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '0 1rem',
    position: 'relative',
  }}>
    <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '1rem', color: accentYellow, textShadow: '2px 2px 8px #222' }}>
      University Event Announcement Board
    </h1>
    <p style={{ fontSize: '1.3rem', maxWidth: 600, margin: '0 auto 2.5rem', color: '#fff', textShadow: '1px 1px 6px #222' }}>
      The all-in-one platform for discovering, sharing, and managing university events, activities, and announcements. Stay connected, get involved, and never miss out!
    </p>
  </div>
);

function btnStyle(bg, color, outline, nav) {
  return {
    background: bg,
    color,
    border: outline ? `2px solid ${color}` : 'none',
    borderRadius: 10,
    fontWeight: 700,
    fontSize: nav ? '1rem' : '1.1rem',
    padding: nav ? '0.6rem 1.3rem' : '0.9rem 2.2rem',
    textDecoration: 'none',
    boxShadow: nav ? '0 1px 6px rgba(0,0,0,0.07)' : '0 2px 12px rgba(0,0,0,0.08)',
    margin: nav ? 0 : '0.5rem 0',
    transition: 'all 0.2s',
    cursor: 'pointer',
    letterSpacing: '1px',
    outline: 'none',
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    ...(nav && { minWidth: 110, textAlign: 'center' }),
  };
}

export default Home; 