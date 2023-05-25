from flask import jsonify, Blueprint

events = Blueprint('events', __name__)

@events.route("/api/event", methods=['GET'])
def get_event():
    return jsonify("Women in CS")