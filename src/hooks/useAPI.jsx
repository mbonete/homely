import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const APIContext = React.createContext();

export function APIProvider({children}) {
  const navigate = useNavigate();
  const client = axios.create({
    baseURL: 'http://localhost:3000',
  });

  const setClientAuth = (token) => {
    console.log('debug', 'setting token', token)
    client.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;
  }

  const [currentUserId, setCurrentUserId] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('debug', 'isLoggedIn', isLoggedIn)

  useEffect(() => {
    const token =  localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (!token) return;
    if(!name) return
    
    setClientAuth(token);
    setCurrentUserName(name);
    setIsLoggedIn(true);
  }, []);

  const login = async (credentials) => {
    const response = await client.post('/tokens', credentials);
    console.log(response)
    if(response.status === 401) return;
    const { accessToken } = response.data;
    const { id, name } = response.data.user;
    setIsLoggedIn(true);  
    // Guardamos el token en el localStorage por si refrescamos la pagina
    // o abrimos un tab nuevo
    localStorage.setItem('token', accessToken);
    localStorage.setItem('name', name);
    // Modificamos el cliente de axios para que inserte la cabecera "Authorization"
    // en cada peticion a partir de ahora. El contenido de esta cabecera tiene que tener
    // el formato `Bearer ${accessToken}`
    setClientAuth(accessToken);
    setCurrentUserId(id);
    setCurrentUserName(name);
    navigate(`/users/${id}`)
    return response;
  }

  const logout = () => {
    setClientAuth();
    setIsLoggedIn(false);
    setCurrentUserId('');
    setCurrentUserName('');
    navigate('/');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };

  const createUser = (user) => client.post('/users', user);

  const getAds = () => {
    console.log(client.defaults.headers.common['Authorization']);
    return client.get('/ads');
  }

  const value = {
    login,
    logout,
    createUser,
    getAds,
    isLoggedIn,
    currentUserId,
    currentUserName,
  }

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  ) 
}

export const useAPI = () => useContext(APIContext);