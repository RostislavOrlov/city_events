from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, jwt_refresh_token_required
from models import db, User, Event

auth_bp = Blueprint('auth', __name__)
events_bp = Blueprint('events', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully"), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'id': user.id})
        return jsonify(access_token=access_token), 200
    return jsonify(message="Invalid credentials"), 401

@events_bp.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.title for event in events]), 200

@events_bp.route('/event/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify({
        'title': event.title,
        'description': event.description,
        'date': event.date.isoformat(),
        'location': event.location,
        'price': event.price,
        'type': event.type,
    }), 200

@events_bp.route('/favorites', methods=['POST'])
@jwt_required()
def add_to_favorites():
    user_id = get_jwt_identity()['id']
    data = request.get_json()
    event_id = data['event_id']
    
    return jsonify(message="Event added to favorites"), 201