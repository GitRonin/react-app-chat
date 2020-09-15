import React, { useState, useEffect } from 'react';
import MessageInput from '../../components/message-input/message-input';
import Header from '../../components/header/header';
import './message-list.css';
import axios from 'axios';
import {api} from '../../message-service.js';
import Message from '../../components/message/message';

export default function MessageList() {
    var TodayYesterday = false;
    var participantsArr = [], participants;
    var lm;
    const nowDataFull = new Date().toISOString();
    const nowData = new Date().getHours();
    const [state, setState] = useState({data: []});
    const [userMesId, setuserMesId] = useState(0);
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
            id: userMesId,
            userId: "0r354041-94v0-22r0-9r1v-9g2s797g5vr5",
            avatar: "https://ru.botlibre.com/images/avatar.png",
            user: "You",
            text: labelText,
            createdAt: nowDataTrue,
            editedAt: "",
            own: true
        };
        setuserMesId(userMesId+1);
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
                return(
                    <Message
                    item={item}
                    TodayYesterday={TodayYesterday}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onToggleLiked={onToggleLiked}
                    />
                )
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
