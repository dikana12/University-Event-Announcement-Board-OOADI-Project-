import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found.</div>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>Department: {event.department}</p>
      <p>Type: {event.type}</p>
      <p>Location: {event.location}</p>
      <p>Start: {event.startDate}</p>
      <p>End: {event.endDate}</p>
      <p>Description: {event.description}</p>
    </div>
  );
};

export default EventDetails; 