import React from 'react';

const About = () => (
  <div style={{ maxWidth: 700, margin: '3rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: '2.5rem 2rem', textAlign: 'center' }}>
    <h2 style={{ color: '#3949ab', fontWeight: 800, marginBottom: '1.5rem' }}>About Us</h2>
    <p style={{ fontSize: '1.15rem', color: '#444', marginBottom: '1.5rem' }}>
      The <b>University Event Announcement Board</b> is a comprehensive platform designed to connect students, faculty, staff, and parents with all school-related events and activities. Our mission is to foster engagement, streamline communication, and create a vibrant digital record of university life.
    </p>
    <p style={{ color: '#666' }}>
      Built by a passionate team for the OOADI project, our system supports academic, extracurricular, and administrative events, with robust document and media management, analytics, and role-based access for a secure, inclusive experience.
    </p>
  </div>
);

export default About; 