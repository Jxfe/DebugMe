from flask import Blueprint, render_template, request,flash

from .models import User
from . import db


auth = Blueprint('auth',__name__)



@auth.route('/login',methods=['GET','POST'])
def login():
    data = request.form
    return  render_template("login.html")


@auth.route('/logout')
def logout():
    return 'You are logged out'


@auth.route('/sign-up',methods=['GET','POST'])
def sign_up():
    
    messages_to_user = {}
    
    if request.method == 'POST':
        messages_to_user = handle_sign_up(request.form)
        
        
    elif request.method == 'GET':
        messages_to_user = {
        'email': 'must have a @',
        'password1':'Must be 4 chars',
        'password2':'passwords must match'
        }
    
    return render_template("signUp.html",message =  messages_to_user)


def handle_sign_up(user_info):
    
    dict_user_info  = dict(user_info)
    
    messages_to_user = {}
    
    successful = True
    
    if is_valid_email(dict_user_info['email']) :
        messages_to_user['email'] = 'succses'
    else:
        messages_to_user['email'] = 'Failed :('
        successful = False
        
        
    if is_valid_password(dict_user_info['password1']):
        messages_to_user['password'] = 'succses'
    else:
        messages_to_user['password'] = 'Failed :('
        successful = False
        
        
    if dict_user_info['password1'] == dict_user_info['password2']:
        messages_to_user['same_password'] = 'succses'
    else:
        messages_to_user['same_password'] = 'Failed :('
        successful = False
        
    if successful:
        add_user_to_database(dict_user_info)
        
    return messages_to_user 
    
    

def add_user_to_database(user_info):
    new_User = User(email=user_info['email'],password=user_info['password1'])

def is_valid_email(user_email):
    return True

def is_valid_password(user_password):
    if(len(user_password) < 4):
        pass
    return True
