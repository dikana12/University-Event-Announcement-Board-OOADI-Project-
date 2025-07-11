# Backend - University Event Announcement Board

## Setup
1. `python -m venv venv`
2. `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
3. `pip install -r requirements.txt`
4. `python app.py`

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/events` - List all events (to be implemented)
- `POST /api/events` - Create a new event (to be implemented)
- `GET /api/events/<id>` - Get event details (to be implemented)
- `POST /api/auth/login` - User login (to be implemented)
- `POST /api/auth/register` - User registration (to be implemented)

## Project Structure
- `app.py` - Main Flask app
- `requirements.txt` - Python dependencies
- `venv/` - Virtual environment

## Notes
- This is a development server. Do not use in production. 