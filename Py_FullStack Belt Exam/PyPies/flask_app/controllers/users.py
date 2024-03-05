from flask_app import app
from flask import render_template, request, redirect, session
from flask import flash
from flask_app.models import user, pie
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
app.secret_key = "5er4g6ed51r23fg1tmlfk"


@app.route('/')
def main():
    if 'user_id' in session:
        return redirect('/dashboard')
        
    return render_template('index.html')

@app.route('/registration', methods=['POST'])
def register():
    if not user.User.validate_user(request.form):
        return redirect('/')

    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)
    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email'],
        'password': pw_hash
    }
    
    flash('Registration Complete','success')
    user.User.add_user(data)
    return redirect('/')


@app.route('/login', methods=['POST'])
def login():
    data = {"email": request.form['email']}
    user_exist = user.User.get_user_by_email(data)
    if not user_exist:
        flash("Invalid User Email",'error')
        return redirect('/')
    if not bcrypt.check_password_hash(user_exist.password, request.form['password']):
        flash("Invalid User Password",'error')
        return redirect('/')

    session['first_name'] = user_exist.first_name
    session['user_id'] = user_exist.id
    print("User In Session")
    return redirect('/dashboard')


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    print('User left the Session')
    return redirect('/')
