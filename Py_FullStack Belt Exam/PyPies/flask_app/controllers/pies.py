from flask_app import app
from flask import render_template, request, redirect, session
from flask_app.models import pie, user


@app.route('/dashboard')
def dashboard():
    if not 'user_id' in session:
        return redirect('/')
    
    data = {'id':session['user_id']}
    user_pies = user.User.get_user_with_pies(data)
    return render_template('user_dashboard.html', username=session.get('first_name'), user = user_pies)

@app.route('/pies')
def pies():
    if not 'user_id' in session:
        return redirect('/')
    
    pies_data = pie.Pie.get_pies_with_votes()
    sorted_pies = sorted(pies_data, key=lambda pie: len(pie.votes), reverse=True)
    return render_template('users_pies.html', pies=sorted_pies)

@app.route('/add/pie', methods=['POST'])
def add_pie():
    if not pie.Pie.validate_pie(request.form):
        return redirect('/dashboard')
    
    data = {
        'name':request.form['name'],
        'filling':request.form['filling'],
        'crust':request.form['crust'],
        'user_id':session['user_id']
        }
    
    pie.Pie.add_pie(data)
    return redirect('/dashboard')


@app.route('/edit/<int:id>')
def update_pie(id):
    if not 'user_id' in session:
        return redirect('/')
    
    data = {'id':id}
    pie_data = pie.Pie.get_pie(data)
    return render_template('edit.html', pie=pie_data)


@app.route('/edit/pie/<int:pie_id>', methods=['POST'])
def edit_pie(pie_id):
    if not pie.Pie.validate_pie(request.form):
        return redirect(f'/edit/{pie_id}')
    data = {
        'id':pie_id,
        'name':request.form['name'],
        'filling':request.form['filling'],
        'crust':request.form['crust']
    }
    
    pie.Pie.update_pie(data)
    return redirect('/dashboard')

@app.route('/remove/<int:pie_id>', methods = ['POST'])
def delete_piee(pie_id):
    
    data = {'id':pie_id}
    
    pie.Pie.delete_pie(data)
    return redirect('/dashboard')

@app.route('/view/<int:pie_id>')
def show_pie(pie_id):
    if not 'user_id' in session:
        return redirect('/')
    
    user_id = session['user_id']
    data = {'id': pie_id}
    vote_data = {'user_id':user_id,
                 'pie_id':pie_id
                 }
    pie_data = pie.Pie.get_pie(data)
    vote_in_db = pie.Pie.get_vote(vote_data)
    return render_template('view_pie.html', pie=pie_data, vote_exist=vote_in_db)


@app.route('/add/vote/<int:pie_id>', methods=['POST'])
def vote(pie_id):
    user_id = session.get('user_id')
    data = {
        'pie_id': pie_id,
        'user_id': user_id
        }
    
    pie.Pie.add_vote(data)
    return redirect(f'/view/{pie_id}')


@app.route('/remove/vote/<int:pie_id>', methods=['POST'])
def unvote(pie_id):
    user_id = session.get('user_id')
    data = {
        'pie_id':pie_id,
        'user_id': user_id
        }
    
    pie.Pie.remove_vote(data)
    return redirect(f'/view/{pie_id}')
