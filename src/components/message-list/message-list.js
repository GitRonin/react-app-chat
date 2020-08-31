import React, {Component} from 'react';
import MessageInput from '../message-input';
import Header from '../header';
import './message-list.css';
// import MessageService from '../../message-service.js';

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
        // console.log(MessageService);
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
            const nowDataFull = new Date().toISOString();
            const nowData = new Date().getHours();
            const nowDataTrue = nowDataFull.slice(0, -13) + nowData + nowDataFull.slice(13);
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index]; 
            const newLabel = prompt("Edit");
            const newItem = {...old, text: newLabel, editedAt: nowDataTrue};
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
        const nowDataFull = new Date().toISOString();
        const nowData = new Date().getHours();
        const nowDataTrue = nowDataFull.slice(0, -13) + nowData + nowDataFull.slice(13);
        const newItem = {
            id: this.id++,
            userId: "",
            avatar: "https://ru.botlibre.com/images/avatar.png",
            user: "You",
            text: labelText,
            createdAt: nowDataTrue,
            editedAt: "",
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
                    {/* <p className={item.createdAt.slice()}/> */}
                <div className="TitleContainerFlexCopied2">
                    <div className="btns-style">
                            <p className={item.editedAt === "" ? "MessageWasEditedNone" : "MessageWasEdited"}>(edited)</p>
                        <div className="btns-style-btn">
                            <p className="btn-edit" onClick={() => this.onEdit(item.id)}/>
                            <p className="btn-delete" onClick={() => this.onDelete(item.id)}/>
                        </div>
                    </div>

                    <div className="TitleMessages" id="message">
                            <img className="MessageAvatar" src={item.avatar} alt="Bot Avatar"/>
                            <p className="MessageName">{item.user}</p>
                            <p className="MessageText" id="valueText">{item.text}</p>
                            <p className="MessageData">{item.createdAt.slice(11, -8)}</p>
                    </div>
                </div>
                </div>
            )
        }
        else{
            return  (
                <div key={item.id}>
                    <p className={() => this.onTodayYesterday(item.id)}/>
                    <div className="TitleContainerFlex">
                        <div className="TitleMessages" id="message" onClick={() => this.onToggleLiked(item.id)}>
                                <img className="MessageAvatar" src={item.avatar} alt="Avatar"/>
                                <p className="MessageName">{item.user}</p>
                                <p className="MessageText" id="valueText">{item.text}</p>
                                <p className="MessageData">{item.createdAt.slice(11, -8)}</p>
                        </div>
                        <p className={item.editedAt === "" ? "MessageWasEditedNone" : "MessageWasEdited"}>(edited)</p>
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
