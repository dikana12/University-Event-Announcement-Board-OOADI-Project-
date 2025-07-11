from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import re

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'  # Change this in production
CORS(app, supports_credentials=True)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# In-memory storage for demonstration
USERS = []
EVENTS = []
EVENT_ID_COUNTER = 1
USER_ID_COUNTER = 1

# User roles
ROLES = ['student', 'teacher', 'admin', 'parent']

class User(UserMixin):
    def __init__(self, id, email, password_hash, name, role, department):
        self.id = id
        self.email = email
        self.password_hash = password_hash
        self.name = name
        self.role = role
        self.department = department

@login_manager.user_loader
def load_user(user_id):
    user_data = next((u for u in USERS if u['id'] == int(user_id)), None)
    if user_data:
        return User(
            user_data['id'],
            user_data['email'],
            user_data['password_hash'],
            user_data['name'],
            user_data['role'],
            user_data['department']
        )
    return None

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validate password strength"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not any(c.isupper() for c in password):
        return False, "Password must contain at least one uppercase letter"
    if not any(c.islower() for c in password):
        return False, "Password must contain at least one lowercase letter"
    if not any(c.isdigit() for c in password):
        return False, "Password must contain at least one number"
    return True, "Password is valid"

@app.route('/api/health')
def health_check():
    return jsonify({'status': 'ok', 'message': 'Backend is running'})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    
    # Validate required fields
    required_fields = ['email', 'password', 'name', 'role']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    
    email = data['email'].lower().strip()
    password = data['password']
    name = data['name'].strip()
    role = data['role'].lower()
    department = data.get('department', '').strip()
    
    # Validate email format
    if not validate_email(email):
        return jsonify({'error': 'Invalid email format'}), 400
    
    # Validate password strength
    is_valid, message = validate_password(password)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Validate role
    if role not in ROLES:
        return jsonify({'error': f'Role must be one of: {", ".join(ROLES)}'}), 400
    
    # Check if email already exists
    if any(user['email'] == email for user in USERS):
        return jsonify({'error': 'Email already registered'}), 409
    
    # Create new user
    global USER_ID_COUNTER
    password_hash = generate_password_hash(password)
    
    user_data = {
        'id': USER_ID_COUNTER,
        'email': email,
        'password_hash': password_hash,
        'name': name,
        'role': role,
        'department': department
    }
    
    USERS.append(user_data)
    USER_ID_COUNTER += 1
    
    # Create user object for login
    user = User(
        user_data['id'],
        user_data['email'],
        user_data['password_hash'],
        user_data['name'],
        user_data['role'],
        user_data['department']
    )
    
    login_user(user)
    
    return jsonify({
        'message': 'Registration successful',
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'role': user.role,
            'department': user.department
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400
    
    email = data['email'].lower().strip()
    password = data['password']
    
    # Find user by email
    user_data = next((u for u in USERS if u['email'] == email), None)
    
    if not user_data or not check_password_hash(user_data['password_hash'], password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Create user object and login
    user = User(
        user_data['id'],
        user_data['email'],
        user_data['password_hash'],
        user_data['name'],
        user_data['role'],
        user_data['department']
    )
    
    login_user(user)
    
    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'role': user.role,
            'department': user.department
        }
    })

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    try:
        logout_user()
        return jsonify({'message': 'Logout successful'})
    except Exception as e:
        # If user is not logged in, still return success
        return jsonify({'message': 'Logout successful'})

@app.route('/api/auth/me', methods=['GET'])
@login_required
def get_current_user():
    return jsonify({
        'id': current_user.id,
        'email': current_user.email,
        'name': current_user.name,
        'role': current_user.role,
        'department': current_user.department
    })

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(EVENTS)

@app.route('/api/events', methods=['POST'])
@login_required
def create_event():
    global EVENT_ID_COUNTER
    data = request.json
    
    # Validate required fields
    required_fields = ['title', 'department', 'type', 'location', 'startDate', 'endDate', 'description']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    
    event = {
        'id': EVENT_ID_COUNTER,
        'title': data['title'],
        'department': data['department'],
        'type': data['type'],
        'location': data['location'],
        'startDate': data['startDate'],
        'endDate': data['endDate'],
        'description': data['description'],
        'createdBy': current_user.id,
        'createdByName': current_user.name,
        'rsvpCount': 0,
        'commentCount': 0
    }
    
    EVENTS.append(event)
    EVENT_ID_COUNTER += 1
    return jsonify(event), 201

@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = next((e for e in EVENTS if e['id'] == event_id), None)
    if not event:
        return jsonify({'error': 'Event not found'}), 404
    return jsonify(event)

if __name__ == '__main__':
    app.run(debug=True) 