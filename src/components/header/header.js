import React from 'react';
import './header.css';
import styled from 'styled-components';
import {auth} from '../../service/firebase.js';

const Title = styled.div`
    border: 1px solid;
    margin 0px 0px 10px 0px;
    padding 20px 10px 10px 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 26px;
        color: black;
    }
    }
    h2 {
        font-size: 1.2rem;
        color: grey;
    }
`;
const Header = ({participants, messages, lastMessage, typeChat}) => {
    return (
        <Title>
            <h1>{auth.currentUser.displayName}</h1>
            <p>{typeChat ? typeChat : "0"} chat</p>
            <h2>{participants ? participants : "0"} participants</h2>
            <h2> {messages ? messages : "0"} messages</h2>
            <h2>Last message at {lastMessage ? lastMessage : "error"}</h2>
        </Title>
    )
}

export default Header;  