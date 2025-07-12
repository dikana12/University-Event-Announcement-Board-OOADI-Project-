# University Event Announcement Board

A full-stack web application for managing and sharing university events, activities, and announcements.

## Features
- User authentication with school-specific roles (students, teachers, admins, parents)
- Event management (create, browse, filter, RSVP)
- File and media uploads (PDFs, images, etc.)
- Historical archive and search
- Real-time notifications
- Responsive, branded UI

## Getting Started

### Frontend (React)
1. `cd frontend`
2. `npm install`
3. `npm start`

### Backend (Flask)
1. `cd backend`
2. `python -m venv venv`
3. `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
5. `python app.py`

## API Integration
- The frontend expects the backend to be running at `http://localhost:5000`.
- Update API endpoints in the frontend as needed for deployment.

## Project Structure
- `frontend/` - React app
- `backend/` - Flask API

## Authors
- Group project for OOADI 