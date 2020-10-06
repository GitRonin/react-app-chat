import React, { useState, useEffect } from 'react';
import MessageInput from '../../components/message-input/message-input';
import Header from '../../components/header/header';
import axios from 'axios';
import {api} from '../../service/message-service.js';
import './message-list.css';
import Message from '../../components/message/message';
import {datebaseMessages} from '../../service/firebase.js';

export default function MessageList() {
    var timeTable = false;
    // const participantsArr = [];
    // var participantsArr = [], participants;
    const date = new Date();
    const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const [state, setState] = useState({data: []}); 
    // const [timeTable, setTimeTable] = useState(false);
    // const [NumbersOfParticipants, setNumbersOfParticipants] = useState(0);
    const [userMesId, setUserMesId] = useState(0);
    useEffect(() => {
        axios.get(api.messages)
        .then((response) => {
            datebaseMessages.ref(`messages/`).set(response.data);
            datebaseMessages.ref(`messages/`).on('value', snap => {
                    setState({data: snap.val()})
                });
        })
        .catch( error => console.log(error) );
    }, []);
    useEffect(() => {
        datebaseMessages.ref(`messages/`).set(state.data);
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
            const newItem = {...old, text: newLabel, editedAt: isoDate};
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
            createdAt: isoDate,
            editedAt: "",
            own: true
        };
        setUserMesId(userMesId + 1);
        setState({data: [...state.data, newItem]});
    }
    const timeTableFunction = (index) => {
        if(state.data[index - 1] !== undefined){
            const IndexCreatedAtNow = new Date(state.data[index].createdAt);
            const IndexCreatedAtPrevious = new Date(state.data[index - 1].createdAt);
            if(IndexCreatedAtPrevious.getFullYear() === IndexCreatedAtNow.getFullYear() && IndexCreatedAtPrevious.getMonth() === IndexCreatedAtNow.getMonth() && IndexCreatedAtPrevious.getDate() === IndexCreatedAtNow.getDate()) {
                IndexCreatedAtNow.getHours() < IndexCreatedAtPrevious.getHours() ? timeTable = true : timeTable = false;
            }
            else{timeTable = true}
        }
    }
    const [NumbersOfParticipants, setNumbersOfParticipants] = useState(0);
    const NumbersOfUsers = (index, userId) => {
        // const participantsArr = [];
        // participantsArr[index] = userId;
        // new Set(participantsArr).size
        setNumbersOfParticipants(NumbersOfParticipants + 4);
    }
    const elements = state.data.map((item, index) => {
        NumbersOfUsers(index, item.userId);
        timeTableFunction(index);
                return(
                    <Message
                    key={item.id}
                    item={item}
                    timeTable={timeTable}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onToggleLiked={onToggleLiked}
                    />
                )
    });
        return(
            <>
                <Header 
                    participants={4}
                    messages={state.data.length}
                    lastMessage={state.data.length ? state.data[state.data.length - 1].createdAt.slice(11, -8) : ''}
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
