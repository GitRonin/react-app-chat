import React, {Component} from 'react';
import styled from 'styled-components';
import './message-list.css';
import botAvatar from './botAvatar.svg';

const Title = styled.div`
    border: 1px solid;
    overflow: scroll;
    max-height: 400px;
`;
const TitleContainer = styled.div`
    width: 500px;
    height: 80px;
    margin: 40px 10px 5px 5px;
    border: 1px solid;
    background-color: #E6E6E6;
    display: flex;
    padding: 0px 10px 0px 0px;
`;

const TextСontainer = () => {
    return(
        <TitleContainer>
            <img className="botAvatar" src={botAvatar} alt="Bot Avatar"/>
            <p id="valueText">Ladyship it daughter securing procured or am moreover mr. Put sir she exercise vicinity cheerful wondered. Continual say suspicion provision you.</p>
        </TitleContainer>
    )
};
export default class MessageList extends Component {
    render() {
        return(
            <Title>
                    <TextСontainer/>
                    <TextСontainer/>
                    <TextСontainer/>
                    <TextСontainer/>
                    <TextСontainer/>
                    <TextСontainer/>
            </Title>
        )   
    }
};