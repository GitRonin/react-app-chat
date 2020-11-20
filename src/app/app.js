import React from 'react';
import MessageList from '../containers/message-list/message-list.jsx';
import SignIn from '../components/signIn/signIn.jsx';
import SignUp from '../components/signUp/signUp.jsx';
import PasswordReset from '../components/passwordReset/passwordReset.jsx';
import logo from '../image/logo.svg';
import './app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { AuthProvider } from '../components/Auth.js';
import PrivateRoute from '../components/PrivateRoute.js';

// document.body.onload = function() {
//   setTimeout(function() {
//     var preloader = document.getElementById('page-preloader');
//     if(preloader.classList.contains('done'))
//     {
//       preloader.classList.add('done');
//     }
//   }, 1000)
// }

export default function App() {
  return(
      <>
        <div className="logo">
          <img className="logoPhoto" src={logo} alt="logo"/>
          <h1 className="logoText">Logo</h1>
        </div>
        <div className="AppBlock">
          <AuthProvider>
            <Router>
              <div>
                <PrivateRoute exact path="/" component={MessageList} />
                <Route exact path="/signUp" component={SignUp}/>
                <Route exact path="/signIn" component={SignIn}/>
                <Route exact path="/passwordReset" component={PasswordReset}/>
              </div>
            </Router>
          </AuthProvider>
        </div>
      </>
  )
}