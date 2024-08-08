import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors
} from './Helpers/auth-helpers';

import Nav from './Components/Nav';
import Post from './Components/Post';
import Loading from './Components/Loading';
import Error from './Components/Error';
import Signup from './Views/Signup';
import Login from './Views/Login';
import Feed from './Views/Feed';
import Upload from './Views/Upload';
import Explore from './Views/Explore';
    

initAxiosInterceptors();

export default function App() { 

  const [user, setUser] = useState(null);  
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }
      try {
        const { data: user } = await Axios.get('/api/usuarios/whoami');
        setUser(user);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }
    cargarUsuario();
  }, []);


  async function login(email, password) {
    const { data } = await Axios.post('/api/usuarios/login', {
      email,
      password
    });
    setUser(data.user);
    setToken(data.token);
  }


  async function signup(user) {
    const { data } = await Axios.post('/api/usuarios/signup', user);
    setUser(data.user);
    setToken(data.token);
  }


  function logout() {
    setUser(null);
    deleteToken();
  }
 
  function esconderError() {
    setError(null);
  }


  if (cargandoUsuario) {
    return (
      <>
      </>
    );
  }
  return (
    <Router>


      <div className="App">
          <div className="side-nav">
              <Nav user={user} logout={logout}/>
          </div>
          <div className="main">
              {user ? (
                <LoginRoutes
                  user={user}
                  logout={logout}
                />
            
               ) : (
                <LogoutRoutes
                  login={login}
                  signup={signup}
                />
                )}
           </div>
      </div>


    </Router> 
  );
}





function LoginRoutes({ user, logout }) {
  return (
    <Switch>

     <Route
        path="/explore"
        render={props => <Explore {...props} user={user}  />}
      />
     

      <Route
        path="/upload"
        render={props => <Upload {...props}  />}
      />
  
 
      <Route
        path="/" exact 
        render={props => (
          <>
          <Feed {...props} user={user} logout={logout} />
          </>
        )}
      />


    </Switch>
  );
}




function LogoutRoutes({ login, signup }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={props => (
          <Login {...props} login={login} />
        )}
      />
      <Route
        render={props => (
          <Signup {...props} signup={signup} />
        )}
        default
      />
    </Switch>
  );
}



