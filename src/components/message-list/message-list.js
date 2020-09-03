import React, {Component} from 'react';
import MessageInput from '../message-input';
import Header from '../header';
import './message-list.css';
import axios from 'axios';

export default class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
        this.id = 0;

        // const a = this;
        // const request = new XMLHttpRequest();
        // request.open("GET", 'http://localhost:3040/messages', false);
        // request.onload = function jsonfunc() {
        //     a.state.data =  JSON.parse(request.response);
        // }
        // request.send();


        var dataState = this.state.data;
        axios.get('http://localhost:3040/messages')
            .then(function(response) {
                dataState = response.data;
                console.log(dataState);
                
            })
            .catch(function(error) {
                console.log(error);
            });

        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        // console.log(MessageService);
    }
    // componentDidMount() {
    //     axios.get('http://localhost:3040/messages')
    //     .then(res => {
    //         console.log(res.data);
    //         // const data = res.data;
    //         // this.setState({data});
    //     })
    // }
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
    const lastMessage = data.length ? data[messages - 1].createdAt.slice(11, -8) :'';
    var participantsArr = [];
    var participants;
    // console.log(data);
    const elements = data.map((item, index) => {
            participantsArr[index] = item.userId;
            participants = new Set(participantsArr);
            participants = participants.size;
            var TodayYesterday = false;


            if(data[index - 1] !== undefined){
                const nowYear = data[index].createdAt.slice(0, -20);
                const nowMouth = data[index].createdAt.slice(5, -17);
                const nowDay = data[index].createdAt.slice(8, -14);
                if(nowYear === data[index - 1].createdAt.slice(0, -20) && nowMouth === data[index - 1].createdAt.slice(5, -17) && nowDay === data[index - 1].createdAt.slice(8, -14)) {
                                const nowHours = Number(data[index].createdAt.slice(11, -11));
                                const previousHours = Number(data[index - 1].createdAt.slice(11, -11));
                                nowHours < previousHours ? TodayYesterday = true : TodayYesterday = false;
                }
                else{TodayYesterday = true}
            }
        if(item.own){
            return(
                <div key={item.id}>
                    <div className={TodayYesterday ? "whenTrue" : "whenFalse"}>
                        <hr className="WhenTrueHR" color="black"/>
                        <div className="WhenTrueDivText">
                            <p className="WhenTrueText">Yesterday</p>
                        </div>
                    </div>
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
                    <div className={TodayYesterday ? "whenTrue" : "whenFalse"}>
                        <hr className="WhenTrueHR" color="black"/>
                    </div>
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
                <div className="title">
                    {elements}
                </div>
                <MessageInput className="Mymessage" onAdd={this.onAdd}/>
            </>
        )   
    }
}
