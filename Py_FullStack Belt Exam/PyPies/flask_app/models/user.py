from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import pie
import re


class User:
    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.pies = []
        
    @classmethod
    def get_user_with_pies(cls, data):
        query = """
        SELECT * FROM users
        JOIN pies
        ON users.id = pies.user_id
        WHERE users.id = %(id)s;
        """
        results = connectToMySQL('pypies_schema').query_db(query, data)
        
        if not results:
            return None
        
        this_user = cls(results[0])
            
        for result in results:
            pie_data = {
                'id': result['pies.id'],
                'name': result['name'],
                'filling': result['filling'],
                'crust': result['crust'],
                'user_id': result['user_id'],
                'created_at': result['pies.created_at'],
                'updated_at': result['pies.updated_at']
            }
            this_user.pies.append(pie_data)

        return this_user
    
        
    @classmethod
    def get_user_by_email(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL('pypies_schema').query_db(query, data)

        if not result:
            return None
        return cls(result[0])
    
    @classmethod
    def get_user_by_id(cls, data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        result = connectToMySQL('pypies_schema').query_db(query, data)
        
        if not result:
            return None
        return cls(result[0])
        
        
    @classmethod
    def add_user(cls, data):
        query = """
        INSERT INTO users (first_name, last_name, email, password) 
        VALUES (%(first_name)s, %(last_name)s, %(email)s, %(password)s);
        """
        return connectToMySQL('pypies_schema').query_db(query, data)
        
    @staticmethod
    def validate_user(user):
        is_valid = True

        if len(user['first_name']) < 3:
            flash("Firstname must be at least 3 characters.", 'error')
            is_valid = False

        if len(user['last_name']) < 3:
            flash("Lastname must be at least 3 characters.", 'error')
            is_valid = False

        email_pattern = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
        if not email_pattern.match(user['email']):
            flash("Not a valid Email.", 'error')
            is_valid = False

        user_in_db = User.get_user_by_email(user)
        if user_in_db:
            flash('There is an Account with the given Email', 'error')
            is_valid = False

        if len(user['password']) < 8:
            flash("Password must be at least 8 characters.", 'error')
            is_valid = False

        if user['password'] != user['confirm_password']:
            flash("Password Confirmation doesn't match the Password.", 'error')
            is_valid = False

        return is_valid
