import React from 'react';
import './header.css';
import styled from 'styled-components';

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
// like, allPosts
const Header = ({users, messages, lastData}) => {
    return (
        <Title>
            <h1>My Chat</h1>
            <h2>{users}23 participants</h2>
            <h2>{messages}53 messages</h2>
            <h2>Last message at 14:28{lastData}</h2>
            {/* <h2>{allPosts} записей, из них понравилось {like}</h2> */}
        </Title>
    )
}

export default Header;  