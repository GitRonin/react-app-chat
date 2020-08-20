import React, {Component} from 'react'; //Suspense, lazy
import Header from '../header';
import MessageInput from '../message-input';
import MessageList from '../message-list';
import logo from './logo.svg';
import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '123'
    }
  }

  render() {
    return (
      <>
        <div>
          <div id="p_prldr">
            <div className="contpre">
              <span className="svg_anm"></span>
            </div>
          </div>
        </div>
        <div className="logo">
          <img className="logoPhoto" src={logo} alt="logo"/>
          <h1 className="logoText">Logo</h1>
        </div>
        <AppBlock>
          <Header/>
          <MessageList/>
          <MessageInput/>
        </AppBlock>
      </>
    )
  }
}