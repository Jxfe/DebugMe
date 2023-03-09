from flask import Blueprint, render_template

from flask_login import login_required, current_user

views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    return render_template("home.html", user=current_user)


@views.route('/react')
def react():
    return render_template('index.html', token="From flask back end")
