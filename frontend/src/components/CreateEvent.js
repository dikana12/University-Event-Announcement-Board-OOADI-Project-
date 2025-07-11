import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '',
    department: '',
    type: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await axios.post('http://localhost:5000/api/events', form);
      setMessage('Event created successfully!');
      setForm({ title: '', department: '', type: '', location: '', startDate: '', endDate: '', description: '' });
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" required />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="Start Date" type="datetime-local" required />
        <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="End Date" type="datetime-local" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <button type="submit">Create</button>
      </form>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default CreateEvent; 