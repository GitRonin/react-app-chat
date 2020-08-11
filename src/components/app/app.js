import React, {Component} from 'react';

import Header from '../header';
import MessageInput from '../message-input';
import MessageList from '../message-list';

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
      <AppBlock>
        <Header>
        </Header>
      </AppBlock>
    )
  }
}
