import React, { useState, useEffect } from 'react';
import MessageInput from '../../components/message-input/message-input';
import Header from '../../components/header/header';
import './message-list.css';
import axios from 'axios';
import {api} from '../../message-service.js';

export default function MessageList() {
    let id = 0;
    var TodayYesterday = false;
    var participantsArr = [], participants;
    var lm;
    const nowDataFull = new Date().toISOString();
    const nowData = new Date().getHours();
    const [state, setState] = useState({data: []});
    const nowDataTrue = nowDataFull.slice(0, -13) + nowData + nowDataFull.slice(13);

    useEffect(() => {
            axios.get(api.messages)
            .then((response) => {
                setState({data: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    const onToggleLiked = (id) => {
        setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index]; 
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }
    const onEdit = (id) => {
        setState(({data}) => {
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
    const onDelete = (id) => {
        setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        });
    }
    const onAdd = (labelText) => {
        const newItem = {
            id: id++,
            userId: "",
            avatar: "https://ru.botlibre.com/images/avatar.png",
            user: "You",
            text: labelText,
            createdAt: nowDataTrue,
            editedAt: "",
            own: true
        };
        setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }
    const someTime = (index) => {
        if(state.data[index - 1] !== undefined){
            const nowYear = state.data[index].createdAt.slice(0, -20);
            const nowMouth = state.data[index].createdAt.slice(5, -17);
            const nowDay = state.data[index].createdAt.slice(8, -14);
            if(nowYear === state.data[index - 1].createdAt.slice(0, -20) && nowMouth === state.data[index - 1].createdAt.slice(5, -17) && nowDay === state.data[index - 1].createdAt.slice(8, -14)) {
                const nowHours = Number(state.data[index].createdAt.slice(11, -11));
                const previousHours = Number(state.data[index - 1].createdAt.slice(11, -11));
                nowHours < previousHours ? TodayYesterday = true : TodayYesterday = false;
            }
            else{TodayYesterday = true}
        }
    }
    const users = (index, userId) => {
        participantsArr[index] = userId;
        participants = new Set(participantsArr);
        participants = participants.size;
    }
    const lastMessage = () => {
        lm = state.data.length ? state.data[state.data.length - 1].createdAt.slice(11, -8) : '';
    }
    const elements = state.data.map((item, index) => {
            lastMessage();
            users(index, item.userId);
            someTime(index);
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
                                <p className="btn-edit" onClick={() => onEdit(item.id)}/>
                                <p className="btn-delete" onClick={() => onDelete(item.id)}/>
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
                        <div className="WhenTrueDivText">
                            <p className="WhenTrueText">Yesterday</p>
                        </div>
                    </div>
                    <div className="TitleContainerFlex">
                        <div className="TitleMessages" id="message" onClick={() => onToggleLiked(item.id)}>
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
                        messages={state.data.length}
                        lastMessage={lm}
                        />
                <div className="title">
                    {elements}
                </div>
                <MessageInput 
                    className="Mymessage" 
                    onAdd={onAdd}/>
            </>
        )   
}
