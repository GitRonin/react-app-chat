import React, {Component} from 'react';
import MessageList from '../message-list';
import logo from '../../image/logo.svg';
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
    };
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
          <MessageList/>
        </AppBlock>
      </>
    )
  }
}