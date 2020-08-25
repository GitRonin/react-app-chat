import React, {Component} from 'react';
import MessageInput from '../message-input';
import Header from '../header';
import styled from 'styled-components';
import './message-list.css';
import botAvatar from './botAvatar.svg';

const Title = styled.div`
    border: 2px solid;
    scroll-behavior: unset;
    max-height: 360px;
    border-radius: 3px;
    overflow: scroll;
`;
const TitleContainer = styled.div`
    width: 500px;
    height: 80px;
    border: 1px solid;
    background-color: #E6E6E6;
    display: flex;
    padding: 0px 10px 0px 0px;
    line-height: 35px;
    transition: 0.5s all;
    cursor: pointer;
    user-select: none;
`;
const TitleContainerFlex = styled.div`
    display: flex;
    margin: 40px 10px 5px 5px;
`;

const TitleContainerFlexCopied2 = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 40px 10px 5px 5px;
`;
// const allmes = this.state.data.length;
export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, avatar: "", label: "Доброе утро!", data: "9:00", like: false},
                {id: 2, avatar: "", label: "Здравствуйте!", data: "9:15", like: false},
                {id: 3, avatar: "", label: "Как Ваши дела?", data: "10:00", like: false},
                {id: 4, avatar: "", label: "Неплохо! Как вы поживаете, как здоровье?", data: "11:25", like: false},
                {id: 5, avatar: "", label: "Отлично! Спасибо, что поинтересовались.", data: "12:10", like: false},
                {id: 6, avatar: "", label: "Ну, право. До свидания, рад был повидаться!", data: "11:00", like: false}
            ],
        };
        this.id = 7;

        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index]; 
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }
    onEdit(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index]; 
            const newLabel = prompt("Edit");
            const newItem = {...old, label: newLabel};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }
    
    onDelete(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        });
    }

    onAdd(labelText) {
        const nowData = new Date().toLocaleTimeString().slice(0,-3);
        const newItem = {
            label: labelText,
            data: nowData,
            like: false,
            id: this.id++,
            own: true
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    render() {
    const {data} = this.state;
    const participants = 10;
    const messages = data.length;
    const lastMessage = data[messages - 1].data;
    const elements = data.map((item) => {
        if(item.own){
            return(
                <div key={item.id}>
                <TitleContainerFlexCopied2>
                    <p className={item.like ? 'heartcopied2' : ''}></p>
                        <p className="btn-edit" onClick={() => this.onEdit(item.id)}/>
                        <p className="btn-delete" onClick={() => this.onDelete(item.id)}/>
                    <TitleContainer className="marginFromMessage" id="message" onClick={() => this.onToggleLiked(item.id)}>
                            <img className="botAvatar" src={botAvatar} alt="Bot Avatar"/>
                            <p className="valueText" id="valueText">{item.label}</p>
                            <p className="MessageData">{item.data}</p>
                    </TitleContainer>
                </TitleContainerFlexCopied2>
                </div>
            )
        }
        else{
            const index = data.findIndex(elem => elem.id === item.id);
            if(data[index - 1] !== undefined){
                const nowFirst = data[index].data.slice(0, -3); //now data
                const nowTwo = data[index].data.slice(-2); //now data
                const previousFirst = data[index - 1].data.slice(0, -3); //previous data
                const previousTwo = data[index - 1].data.slice(-2); //previous data
                // console.log(`текущий 1-  ${nowFirst}    предыдущий 1- ${previousFirst}  ${index}`);
                // console.log(`текущий 2-  ${nowTwo}   предыдущий 2- ${previousTwo}`);
                if( nowFirst < previousFirst && nowFirst < previousTwo ) {console.log(`${nowFirst}:${nowTwo}<${previousFirst}:${previousTwo}`)}
            }
            return  (
                <div key={item.id}>
                <TitleContainerFlex>
                    <TitleContainer id="message" onClick={() => this.onToggleLiked(item.id)}>
                            <img className="botAvatar" src={botAvatar} alt="Bot Avatar"/>
                            <p className="valueText" id="valueText">{item.label}</p>
                            <p className="MessageData">{item.data}</p>
                    </TitleContainer>
                    <p className={item.like ? 'heart' : ''}></p>
                </TitleContainerFlex>
                </div>
            )
        }
    });
        return(
            <>
                <Header participants={participants}
                        messages={messages}
                        lastMessage={lastMessage}/>
                <Title>
                    {elements}
                </Title>
                <MessageInput className="Mymessage" onAdd={this.onAdd}/>
            </>
        )   
    }
}
