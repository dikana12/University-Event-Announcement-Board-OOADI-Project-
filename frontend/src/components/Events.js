import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ department: '', type: '', period: 'upcoming' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filtering logic
  const filteredEvents = events.filter(event => {
    let match = true;
    if (filter.department && event.department !== filter.department) match = false;
    if (filter.type && event.type !== filter.type) match = false;
    return match;
  });

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Events</h2>
      <div>
        <label>Department:</label>
        <select value={filter.department} onChange={e => setFilter({ ...filter, department: e.target.value })}>
          <option value="">All</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Sports">Sports</option>
        </select>
        <label>Type:</label>
        <select value={filter.type} onChange={e => setFilter({ ...filter, type: e.target.value })}>
          <option value="">All</option>
          <option value="Academic">Academic</option>
          <option value="Extracurricular">Extracurricular</option>
          <option value="Administrative">Administrative</option>
        </select>
      </div>
      <div>
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul>
            {filteredEvents.map(event => (
              <li key={event.id}>{event.title} ({event.department}, {event.type})</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Events; 