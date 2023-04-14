import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const APIContext = React.createContext();

const client = axios.create({
  baseURL: 'http://localhost:3000',
});

export function APIProvider({children}) {
  const navigate = useNavigate();

  const authenticateAxios = (token) => {
    client.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;
  }

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =  localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token) return;
    
    authenticateAxios(token);
    if (user) setCurrentUser(JSON.parse(user));
    setIsLoggedIn(true);
  }, []);

  const login = async (credentials) => {

    const response = await client.post('/tokens', credentials);

    const { accessToken } = response.data;
    const { user } = response.data;
    setIsLoggedIn(true);  
    // Guardamos el token en el localStorage por si refrescamos la pagina
    // o abrimos un tab nuevo
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    // Modificamos el cliente de axios para que inserte la cabecera "Authorization"
    // en cada peticion a partir de ahora. El contenido de esta cabecera tiene que tener
    // el formato `Bearer ${accessToken}`
    authenticateAxios(accessToken);
    setCurrentUser(user);
    navigate(`/ads`)
    return response;
  }

  const logout = () => {
    authenticateAxios();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const createUser = (user) => client.post('/users', user);

  const createAd = (ad) => {
    return client.post('/ads', ad, {
      headers: {
        "Content-Type": "multipart/form-data",
    }});
  }

  const getAds = () => {
    return client.get('/ads');
  }

  const getAd = (id) => {
    return client.get(`/ads/${id}`)
  }

  const editAd = (id, updatedFields) => {
    return client.put(`ads/${id}`, updatedFields)
  }

  const deleteAd = (id) => {
    return client.delete(`/ads/${id}`)
  }

  const value = {
    login,
    logout,
    createUser,
    createAd,
    getAds,
    getAd,
    editAd,
    deleteAd,
    isLoggedIn,
    currentUser,
  }

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  ) 
}

export const useAPI = () => useContext(APIContext);