import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from './About';
import IndexHome from './login/IndexHome'
import Signin from './login/Signin'
import Signup from './login/Signup'
import Forget from './login/Forget'
import Reset from './login/Reset'
import Profile from './login/Profile'

function App() {


  return (
    <>

    <BrowserRouter>
      <Switch>
        <Route exact component={IndexHome} path="/"/>
        <Route exact component={About} path="/about"/>
        <Route exact component={IndexHome} path="/connect/google/redirect"/>
        <Route exact component={Signin} path="/signin"/>
        <Route exact component={Signup} path="/signup"/>
        <Route exact component={Forget} path="/forgetpassword"/>
        <Route exact component={Reset} path="/reset-password"/>
        <Route exact component={Profile} path="/profile"/>
      </Switch>
    </BrowserRouter>
 
    </>
    
  );
}

export default App;
