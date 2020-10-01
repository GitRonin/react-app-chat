import React, { useState, useEffect } from 'react';
import MessageInput from '../../components/message-input/message-input';
import Header from '../../components/header/header';
import axios from 'axios';
import {api} from '../../service/message-service.js';
import './message-list.css';
import Message from '../../components/message/message';
import {db} from '../../service/firebase.js';

export default function MessageList() {
    var TodayYesterday = false;
    var participantsArr = [], participants;
    var lm;
    const nowDataFull = new Date().toISOString();
    const nowData = new Date().getHours();
    const [state, setState] = useState({data: []});
    const [userMesId, setUserMesId] = useState(0);
    const nowDataTrue = nowDataFull.slice(0, -13) + nowData + nowDataFull.slice(13);
    useEffect(() => {
        axios.get(api.messages)
        .then((response) => {
                db.ref(`messages/`).set(response.data);
                db.ref(`messages/`).on('value', snap => {
                    setState({data: snap.val()})
                });
        })
        .catch( error => console.log(error) );
    }, []);
    useEffect(() => {
        db.ref(`messages/`).set(state.data);
      }, [state.data]);
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
        setState({
            data: state.data.filter(elem => elem.id !== id)
        });
    }
    const onAdd = (labelText) => {
        const newItem = {
            id: `${userMesId}`,
            userId: "0r354041-94v0-22r0-9r1v-9g2s797g5vr5",
            avatar: "https://ru.botlibre.com/images/avatar.png",
            user: "You",
            text: labelText,
            createdAt: nowDataTrue,
            editedAt: "",
            own: true
        };
        setUserMesId(userMesId + 1);
        setState({data: [...state.data, newItem]});
    }
    const someTime = (index) => {
        if(state.data[index - 1] !== undefined){
            const itemCreatedAt = state.data[index].createdAt
            const nowYear = itemCreatedAt.slice(0, -20);
            const nowMouth = itemCreatedAt.slice(5, -17);
            const nowDay = itemCreatedAt.slice(8, -14);
            if(nowYear === state.data[index - 1].createdAt.slice(0, -20) && nowMouth === state.data[index - 1].createdAt.slice(5, -17) && nowDay === state.data[index - 1].createdAt.slice(8, -14)) {
                const nowHours = Number(itemCreatedAt.slice(11, -11));
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
                    key={item.id}
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
