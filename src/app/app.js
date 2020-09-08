import React, {Component} from 'react';
import MessageList from '../containers/message-list/message-list';
import logo from '../image/logo.svg';
import './app.css';
import styled from 'styled-components';
const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

// document.body.onload = function() {
//   setTimeout(function() {
//     var preloader = document.getElementById('page-preloader');
//     if(preloader.classList.contains('done'))
//     {
//       preloader.classList.add('done');
//     }
//   }, 1000)
// }

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '123'
    };
  }
  render() {
    return (
      <>
        <div className="logo">
          <img className="logoPhoto" src={logo} alt="logo"/>
          <h1 className="logoText">Logo</h1>
        </div>
        <AppBlock>
          <MessageList/>
        </AppBlock>
      </>
    )
  }
}