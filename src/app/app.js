import React from 'react';
import MessageList from '../containers/message-list/message-list';
import logo from '../image/logo.svg';
import './app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from '../components/constants/routes.js';
import Navigation from '../components/navigation/navigation';
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
          <Router>
            <Navigation/>
            <Route path={ROUTES.LANDING} component={MessageList}/>
          </Router>
        </div>
      </>
  )
}