import React from 'react';
import './App.css';

import UserList from './components/UserList';
import Profile from './components/Profile';
import Login from './components/Login';
import Chat from "./components/Chat";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignupForm from "./components/SignUp";


function App() {

  return (
      <div className="App">
        <h1>Application</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <UserList />
            </Route>
              <Route path="/signup">
                  <SignupForm/>
              </Route>
              <Route path="/profile">
                  <Profile/>
              </Route>
              <Route path="/login">
                  <Login/>
              </Route>
              <Route path="/chat">
                  <Chat/>
              </Route>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
