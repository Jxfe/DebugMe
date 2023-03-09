from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':

        if is_registered_user(dict(request.form)):
            user = get_user_with_email(request.form.get('email'))
            login_user(user, remember=True)
            return render_template("login.html", user=current_user, login_info='You are logged in')
        else:
            return render_template("login.html", user=current_user, login_info='Incorrect username or password')

    return render_template("login.html", user=current_user, login_info='')


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    messages_to_user = {}

    if request.method == 'POST':
        dict_user_info = dict(request.form)
        messages_to_user = handle_sign_up(dict_user_info)

        if messages_to_user['successful login']:
            login_user(get_user_with_email(dict_user_info['email']), remember=True)
            return redirect(url_for('views.home'))


    elif request.method == 'GET':
        messages_to_user = {
            'email': 'must have a @',
            'password1': 'Must be 4 chars',
            'password2': 'passwords must match'
        }

    return render_template("signUp.html", user=current_user, message=messages_to_user)


def handle_sign_up(user_info):
    messages_to_user = {}

    successful = True

    already_registered_user = User.query.filter_by(email=user_info['email']).first()

    if is_valid_email(user_info['email']):
        messages_to_user['email'] = 'succses'
    else:
        messages_to_user['email'] = 'Failed :('
        successful = False

    if already_registered_user:
        successful = False
        messages_to_user['email'] = 'email already exists'

    if is_valid_password(user_info['password1']):
        messages_to_user['password'] = 'succses'
    else:
        messages_to_user['password'] = 'Failed :('
        successful = False

    if user_info['password1'] == user_info['password2']:
        messages_to_user['same_password'] = 'succses'
    else:
        messages_to_user['same_password'] = 'Failed :('
        successful = False

    if successful:
        add_user_to_database(user_info)
        messages_to_user['successful login'] = True
    else:
        messages_to_user['successful login'] = False

    return messages_to_user


def is_registered_user(user_input):
    user = get_user_with_email(user_input['email'])
    if user:
        if check_password_hash(user.password, user_input['password']):
            return True
    return False


def get_user_with_email(user_email):
    return User.query.filter_by(email=user_email).first()


def add_user_to_database(user_info):
    new_user = User(
        email=user_info['email'],
        password=generate_password_hash(user_info['password1'], method='sha256')
    )
    db.session.add(new_user)
    db.session.commit()


def is_valid_email(user_email):
    return True


def is_valid_password(user_password):
    if (len(user_password) < 4):
        pass
    return True
