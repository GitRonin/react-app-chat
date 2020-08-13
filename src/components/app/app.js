import React, {Component, Suspense, lazy} from 'react';

import Preloader from '../preloader/';
import Header from '../header';
// import MessageInput from '../message-input';
// import MessageList from '../message-list';

import './app.css';
import styled from 'styled-components';

const MainArea = lazy(() => import('../preloader'));

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
      <div>
        <div>
          <div id="p_prldr">
            <div class="contpre">
              <span class="svg_anm"></span>
            </div>
          </div>
        </div>
        {/* <Suspense fallback={<Preloader/>}>
          <MainArea />
        </Suspense> */}
        <AppBlock>
          <Header>
          </Header>
        </AppBlock>
      </div>
    )
  }
}
