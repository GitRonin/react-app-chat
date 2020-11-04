import React, {useContext} from 'react';
import {UserContext} from '../providers/UserProvider.jsx';
// import {Router} from 'react-router-dom';
import MessageList from '../containers/message-list/message-list.jsx';
import SignIn from '../components/signIn/signIn.jsx';
import SignUp from '../components/signUp/signUp.jsx';
import ProfilePage from '../components/profilePage/profilePage.jsx';
import PasswordReset from '../components/passwordReset/passwordReset.jsx';
import logo from '../image/logo.svg';
import './app.css';
import {BrowserRouter as Router} from 'react-router-dom';
// import * as ROUTES from '../components/constants/routes.js';
// import Navigation from '../components/navigation/navigation';
import UserProvider from '../components/providers/UserProvider';

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
  const user = useContext(UserContext);
  return(
      <>
        <div className="logo">
          <img className="logoPhoto" src={logo} alt="logo"/>
          <h1 className="logoText">Logo</h1>
        </div>
        <div className="AppBlock">
          <UserProvider>
            {user.user ?
              <ProfilePage/>
            :
              <Router>
                {/* <MessageList/> */}
                <SignUp path="signUp"/>
                <SignIn path="/"/>
                <PasswordReset path="passwordReset"/>
              </Router>
            }
          </UserProvider>
        </div>
      </>
  )
}