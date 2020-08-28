import React, {Component} from 'react';
import MessageInput from '../message-input';
import Header from '../header';
import './message-list.css';
import botAvatar from './botAvatar.svg';

export default class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
        const a = this;
        const request = new XMLHttpRequest();
        request.open("GET", 'http://localhost:3040/messages', false);
        request.onload = function jsonfunc() {
        a.state.data =  JSON.parse(request.response);
      }
      request.send();
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
            const newItem = {...old, text: newLabel};
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
        const nowDataChange = `12345678910${nowData}12345678`;
        const newItem = {
            text: labelText,
            createdAt: nowDataChange,
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
    const messages = data.length;
    const lastMessage = data[messages - 1].createdAt.slice(11, -8);
    var participantsArr = [];
    var participants;
    const elements = data.map((item, index) => {
            participantsArr[index] = item.userId;
            participants = new Set(participantsArr);
            participants = participants.size;
        if(item.own){
            return(
                <div key={item.id}>
                <div className="TitleContainerFlexCopied2">
                    <div className="btns-style">
                            <p className="MessageWasEdited">(edited)</p>
                        <div className="btns-style-btn">
                            <p className="btn-edit" onClick={() => this.onEdit(item.id)}/>
                            <p className="btn-delete" onClick={() => this.onDelete(item.id)}/>
                        </div>
                    </div>

                    <div className="TitleMessages" id="message" onClick={() => this.onToggleLiked(item.id)}>
                            <img className="MessageAvatar" src={botAvatar} alt="Bot Avatar"/>
                            <p className="MessageName">You</p>
                            <p className="MessageText" id="valueText">{item.text}</p>
                            <p className="MessageData">{item.createdAt.slice(11, -8)}</p>
                    </div>
                </div>
                </div>
            )
        }
        else{
            // const index = data.findIndex(elem => elem.id === item.id);
            // if(data[index - 1] !== undefined){
            //     const nowFirst = Number(data[index].createdAt.slice(0, -3)); //now data
            //     const nowTwo = Number(data[index].createdAt.slice(-2)); //now data
            //     const previousFirst = Number(data[index - 1].createdAt.slice(0, -3)); //previous data
            //     const previousTwo = Number(data[index - 1].createdAt.slice(-2)); //previous data
            //     if( nowFirst < previousFirst && nowTwo < previousTwo ) console.log(` ${nowFirst}:${nowTwo}<${previousFirst}:${previousTwo}`)
            //     // console.log(`${nowFirst}:${nowTwo}<${previousFirst}:${previousTwo}`)
            // }
            return  (
                <div key={item.id}>
                    {/* <hr id="elem" className="BeetwenMessages"/> */}
                <div className="TitleContainerFlex">
                    <div className="TitleMessages" id="message" onClick={() => this.onToggleLiked(item.id)}>
                            <img className="MessageAvatar" src={item.avatar} alt="Avatar"/>
                            <p className="MessageName">{item.user}</p>
                            <p className="MessageText" id="valueText">{item.text}</p>
                            <p className="MessageData">{item.createdAt.slice(11, -8)}</p>
                    </div>
                    <p className={item.like ? 'heart' : ''}></p>
                </div>
                </div>
            )
        }
    });
        return(
            <>
                <Header 
                participants={participants}
                        messages={messages}
                        lastMessage={lastMessage}
                        />
                <p class="title">
                    {elements}
                </p>
                <MessageInput className="Mymessage" onAdd={this.onAdd}/>
            </>
        )   
    }
}
