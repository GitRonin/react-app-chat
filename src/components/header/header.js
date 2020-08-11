import React from 'react';
import './header.css';
import styled from 'styled-components';

const Title = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 26px;
        color: ${props => props.colored ? 'red' : 'black'};
        :hover {
            color: blue;
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
        <Title as='a'>
            <h1>My Chat</h1>
            <h2>{users} participants</h2>
            <h2>{messages} messages</h2>
            <h2>Last message at {lastData}</h2>
            {/* <h2>{allPosts} записей, из них понравилось {like}</h2> */}
        </Title>
    )
}

export default Header;  