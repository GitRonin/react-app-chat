import React from 'react';
import styled from 'styled-components';
import { ListGroup } from 'reactstrap';
import './message-list.css';
import botAvatar from './botAvatar.svg';

const Title = styled.div`
    border: 2px solid;
    overflow: scroll;
    max-height: 360px;
    border-radius: 3px;
    position: relative;
`;
const TitleContainer = styled.div`
    width: 500px;
    height: 80px;
    margin: 40px 10px 5px 5px;
    border: 1px solid;
    background-color: #E6E6E6;
    display: flex;
    padding: 0px 10px 0px 0px;
    float: right;
`;



const MessageList = () => {
    const ArrayMessages = [
        {id: 1, avatar: "", label: "My chat", data: "14:00", like: false},
        {id: 2, avatar: "", label: "participants", data: "15:00", like: false},
        {id: 3, avatar: "", label: "messages", data: "16:00", like: true},
        {id: 4, avatar: "", label: "Last messager", data: "17:00", like: false},
        {id: 5, avatar: "", label: "12321421", data: "18:00", like: false}
    ];

const onToggleLiked = (item, id) => {
    // if (like) classNames += ' like';
    if (id === item.id) {
        if(item.like) {
            item.like = false;
        }
        else{
            item.like = true;
        }
    }
    
}

    const elements = ArrayMessages.map((item, id) => {
        id++;
        return  (
            <>
                <TitleContainer className={item.like ? 'heart' : ''} id="message" onClick={() => onToggleLiked(item, id)}>
                        <img className="botAvatar" src={botAvatar} alt="Bot Avatar"/>
                        <p className="valueText" id="valueText">{item.label}</p>
                        <p className="MessageData">{item.data}</p>
                </TitleContainer>
            </>
        )
    });
        return(
            <Title>
                <ListGroup>
                    {elements}
                </ListGroup>
            </Title>
        )   
    }

    

export default MessageList;