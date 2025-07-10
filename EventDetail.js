import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const [eventRes, commentsRes, rsvpRes] = await Promise.all([
          axios.get(`/api/events/${id}`),
          axios.get(`/api/events/${id}/comments`),
          axios.get(`/api/events/${id}/rsvp`).catch(() => ({ data: { status: null } }))
        ]);
        setEvent(eventRes.data);
        setComments(commentsRes.data);
        setRsvpStatus(rsvpRes.data.status);
        setIsAttending(rsvpRes.data.status === 'attending');
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`/api/events/${id}/comments`, {
        content: newComment
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleRsvp = async (status) => {
    try {
      await axios.post(`/api/events/${id}/rsvp`, { status });
      setRsvpStatus(status);
      setIsAttending(status === 'attending');
      if (status === 'attending') {
        setEvent(prev => ({
          ...prev,
          rsvpCount: prev.rsvpCount + 1
        }));
      } else if (rsvpStatus === 'attending' && status !== 'attending') {
        setEvent(prev => ({
          ...prev,
          rsvpCount: prev.rsvpCount - 1
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/api/events/${id}`);
        navigate('/events');
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading event details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!event) return <div className="not-found">Event not found</div>;

  return (
    <div className="event-detail-container">
      <div className="event-header">
        <div className="event-header-content">
          <div className="event-categories">
            <span className="event-category">{event.category}</span>
            <span className="event-department">{event.department}</span>
          </div>
          <h1>{event.title}</h1>
          <div className="event-meta">
            <div className="event-date">
              <i className="far fa-calendar-alt"></i>
              {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
            </div>
            <div className="event-time">
              <i className="far fa-clock"></i>
              {new Date(event.startDate).toLocaleTimeString()} - {new Date(event.endDate).toLocaleTimeString()}
            </div>
            <div className="event-location">
              <i className="fas fa-map-marker-alt"></i>
              {event.location}
            </div>
            <div className="event-audience">
              <i className="fas fa-users"></i>
              For: {event.audience}
            </div>
          </div>
        </div>
        <div className="event-header-image">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.title} />
          ) : (
            <div className="event-image-placeholder">
              <i className="fas fa-calendar-alt"></i>
            </div>
          )}
        </div>
      </div>

      <div className="event-content">
        <div className="event-main">
          <div className="event-description">
            <h2>Event Description</h2>
            <p>{event.description}</p>
          </div>

          {event.schedule && (
            <div className="event-schedule">
              <h2>Schedule</h2>
              <div className="schedule-items">
                {event.schedule.map((item, index) => (
                  <div key={index} className="schedule-item">
                    <div className="schedule-time">
                      {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="schedule-details">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      {item.speaker && (
                        <p className="schedule-speaker">
                          <i className="fas fa-user"></i> {item.speaker}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.files && event.files.length > 0 && (
            <div className="event-files">
              <h2>Related Files</h2>
              <div className="file-list">
                {event.files.map(file => (
                  <a 
                    key={file.id} 
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="file-item"
                  >
                    <i className={`fas fa-file-${file.type === 'pdf' ? 'pdf' : 'image'}`}></i>
                    <span>{file.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="event-comments">
            <h2>Comments ({comments.length})</h2>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target)}
                placeholder="Add a comment..."
                rows="3"
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </form>

            <div className="comments-list">
              {comments.length === 0 ? (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-author">
                      <div className="comment-avatar">
                        {comment.user.avatar ? (
                          <img src={comment.user.avatar} alt={comment.user.name} />
                        ) : (
                          <span>{comment.user.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="comment-user">
                        <h4>{comment.user.name}</h4>
                        <p className="comment-date">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="comment-content">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="event-sidebar">
          <div className="event-rsvp">
            <h3>RSVP</h3>
            <div className="rsvp-status">
              <p>
                <strong>{event.rsvpCount}</strong> people attending
              </p>
              <div className="rsvp-buttons">
                <button
                  onClick={() => handleRsvp('attending')}
                  className={`btn ${isAttending ? 'btn-success' : 'btn-outline'}`}
                >
                  {isAttending ? (
                    <>
                      <i className="fas fa-check"></i> Attending
                    </>
                  ) : (
                    'I will attend'
                  )}
                </button>
                <button
                  onClick={() => handleRsvp('not_attending')}
                  className={`btn ${rsvpStatus === 'not_attending' ? 'btn-danger' : 'btn-outline'}`}
                >
                  {rsvpStatus === 'not_attending' ? 'Not Attending' : 'Decline'}
                </button>
                <button
                  onClick={() => handleRsvp('maybe')}
                  className={`btn ${rsvpStatus === 'maybe' ? 'btn-warning' : 'btn-outline'}`}
                >
                  {rsvpStatus === 'maybe' ? 'Maybe' : 'Maybe'}
                </button>
              </div>
            </div>
          </div>

          <div className="event-organizer">
            <h3>Organizer</h3>
            <div className="organizer-info">
              <div className="organizer-avatar">
                {event.organizer.avatar ? (
                  <img src={event.organizer.avatar} alt={event.organizer.name} />
                ) : (
                  <span>{event.organizer.name.charAt(0)}</span>
                )}
              </div>
              <div className="organizer-details">
                <h4>{event.organizer.name}</h4>
                <p>{event.organizer.role}</p>
                <p>{event.organizer.department}</p>
              </div>
            </div>
          </div>

          <div className="event-share">
            <h3>Share Event</h3>
            <div className="share-buttons">
              <button className="btn btn-outline">
                <i className="fab fa-facebook"></i> Facebook
              </button>
              <button className="btn btn-outline">
                <i className="fab fa-twitter"></i> Twitter
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-envelope"></i> Email
              </button>
            </div>
          </div>

          {event.organizer.id === user?.id && (
            <div className="event-actions">
              <h3>Event Management</h3>
              <Link to={`/events/${id}/edit`} className="btn btn-outline">
                <i className="fas fa-edit"></i> Edit Event
              </Link>
              <button onClick={handleDeleteEvent} className="btn btn-danger">
                <i className="fas fa-trash"></i> Delete Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;