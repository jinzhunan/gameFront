import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Tetris from './components/games/gameTetris/Tetris';
import Memory from './components/games/gameMemory/Memory';
import Shop from './components/games/gameShop/Shop';
import HomePage from './components/HomePage'
import Signin from './components/login/Signin'
import Signup from './components/login/Signup'
import Forget from './components/login/Forget'
import Reset from './components/login/Reset'
import Profile from './components/login/Profile'

function App() {

  return (
    <>

    <BrowserRouter>
      <Switch>
        <Route exact component={HomePage} path="/"/>
        {/* LogIn */}
        <Route exact component={HomePage} path="/connect/google/redirect"/>
        <Route exact component={Signin} path="/signin"/>
        <Route exact component={Signup} path="/signup"/>
        <Route exact component={Forget} path="/forgetpassword"/>
        <Route exact component={Reset} path="/reset-password"/>
        <Route exact component={Profile} path="/profile"/>
        {/* games */}
        <Route exact component={Tetris} path="/tetris"/>
        <Route exact component={Memory} path="/memory"/>
        <Route exact component={Shop} path="/shop"/>
      </Switch>
    </BrowserRouter>
 
    </>
    
  );
}

export default App;
