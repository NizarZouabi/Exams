import { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({ firstName: '' }, { lastName: '' });
  const id = localStorage.getItem('userId')
  
  useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${id}`, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setLoggedInUser(res.data.user)
            })
        .catch(err => console.log(err))
    }, [id,setLoggedInUser]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
