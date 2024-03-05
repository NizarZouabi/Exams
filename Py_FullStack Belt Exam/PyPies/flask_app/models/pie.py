from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import user


class Pie:
    def __init__(self,data):
        self.id = data['id']
        self.name = data['name']
        self.filling = data['filling']
        self.crust = data['crust']
        self.user_id = data['user_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.owner = None
        self.votes = []
        

    @classmethod
    def add_pie(cls,data):
        query = "INSERT INTO pies (name, filling, crust, user_id) VALUES (%(name)s,%(filling)s,%(crust)s,%(user_id)s);"
        return connectToMySQL('pypies_schema').query_db(query,data)
    
    @classmethod
    def delete_pie(cls,data):
        query = "DELETE FROM pies WHERE id = %(id)s"
        return connectToMySQL('pypies_schema').query_db(query,data)
    
    @classmethod
    def get_pie(cls,data):
        query = "SELECT * FROM pies WHERE id = %(id)s"
        result = connectToMySQL('pypies_schema').query_db(query,data)
        
        if not result:
            return None
        else:
            pie = cls(result[0])
            
        return pie
    
    @classmethod
    def update_pie(cls,data):
        query="UPDATE pies SET name = %(name)s, filling = %(filling)s, crust = %(crust)s WHERE id = %(id)s"
        return connectToMySQL('pypies_schema').query_db(query,data)
    
    @classmethod
    def get_pies_with_votes(cls):
        query = """
        SELECT * FROM pies
        LEFT JOIN users
        ON pies.user_id = users.id
        LEFT JOIN votes
        ON pies.id = votes.pie_id
        LEFT JOIN users AS voted_by
        ON votes.user_id = voted_by.id ORDER BY pies.id;
        """
        results = connectToMySQL('pypies_schema').query_db(query)
        
        pies = []
        this_pie = None
        for result in results:
            if this_pie == None or this_pie.id != result['id']:
                this_pie = cls(result)
                user_data = {
                    'id': result['users.id'],
                    'first_name': result['first_name'],
                    'last_name': result['last_name'],
                    'email': result['email'],
                    'password': result['password'],
                    'created_at': result['users.created_at'],
                    'updated_at': result['users.updated_at']
                }
                this_pie.owner = user.User(user_data)
                pies.append(this_pie)
            if not result['votes.user_id'] == None:
                voter_data = {
                    'id': result['voted_by.id'],
                    'first_name': result['voted_by.first_name'],
                    'last_name': result['voted_by.last_name'],
                    'email': result['voted_by.email'],
                    'password': result['voted_by.password'],
                    'created_at': result['voted_by.created_at'],
                    'updated_at': result['voted_by.updated_at']
                }
                this_pie.votes.append(user.User(voter_data))
                
        print(pies)
        return pies
    
    @classmethod
    def add_vote(cls,data):
        query = "INSERT INTO votes (user_id , pie_id) VALUES (%(user_id)s , %(pie_id)s);"
        return connectToMySQL('pypies_schema').query_db(query,data)
    
    @classmethod
    def remove_vote(cls, data):
        query = "DELETE FROM votes WHERE user_id = %(user_id)s AND pie_id = %(pie_id)s;"
        return connectToMySQL('pypies_schema').query_db(query, data)
    
    @classmethod
    def get_vote(cls, vote_data):
        query = "SELECT * FROM votes WHERE user_id = %(user_id)s AND pie_id = %(pie_id)s"
        result = connectToMySQL('pypies_schema').query_db(query,vote_data)
        
        if not result:
            return None
        else:
            vote = result[0]

        return vote
    
    @staticmethod
    def validate_pie(pie):
        is_valid = True

        if len(pie['name']) < 2:
            flash("Name must be at least 2 characters.", 'error')
            is_valid = False

        if len(pie['filling']) < 2:
            flash("Filling must be at least 2 characters.", 'error')
            is_valid = False

        if len(pie['crust']) < 2:
            flash("Crust must be at least 2 characters.", 'error')
            is_valid = False

        return is_valid
