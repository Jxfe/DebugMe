from flask import request, flash, jsonify, Blueprint, render_template

events = Blueprint('events', __name__)

@events.route("/api/event", methods=['GET'])
def get_event():
    return "Women in CS"