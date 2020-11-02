import React, { useState, useEffect } from 'react';
import MessageInput from '../../components/message-input/message-input';
import Header from '../../components/header/header';
import './message-list.css';
import Message from '../../components/message/message';
import {datebaseMessages} from '../../service/firebase.js';

export default function MessageList() {
    // var timeTable = false;
    const date = new Date();
    const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const [state, setState] = useState({data: []}); 
    // const [timeTable, setTimeTable] = useState(false);
    const [NumbersOfParticipants, setNumbersOfParticipants] = useState(0);
    const [userMesId, setUserMesId] = useState(0);
    
    useEffect(_ => {
            datebaseMessages.ref(`messages`).on('value', snap => {
                    setState({data: snap.val()})
                    NumbersOfUsers(snap);
                    // timeTableFunction(snap);
                });
    }, []);
    const onToggleLiked = (id) => {
        setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            datebaseMessages.ref(`messages/${index}`).update({like: !old.like});
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
            console.log(isoDate);
            const newItem = {...old, text: newLabel, editedAt: isoDate};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            datebaseMessages.ref(`messages/${index}`).update({text: newLabel, editedAt: isoDate});
            return {
                data: newArr
            }
        });
    }
    const onDelete = (id) => {
        setState(_ => {
            const newArr = state.data.filter(elem => elem.id !== id);
            datebaseMessages.ref(`messages/`).set({...newArr});
            return{
                data: newArr
            }
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
        datebaseMessages.ref(`messages/`).set([...state.data, newItem]);
    }
    const NumbersOfUsers = (snap) => {
        const userIds = snap.val().map(message => message.userId);
        const numberOfUsers = [...new Set(userIds)].length;
        setNumbersOfParticipants(numberOfUsers);
    }
    // const timeTableFunction = (snap) => {
    //     const userIndex = snap.val().map((item, index) => index);
    //         console.log(index);
    //         if(snap.val()[index - 1] !== undefined){
    //             const IndexCreatedAtNow = new Date(snap.val()[index].createdAt);
    //             const IndexCreatedAtPrevious = new Date(snap.val()[index - 1].createdAt);
    //             if(IndexCreatedAtPrevious.getFullYear() === IndexCreatedAtNow.getFullYear() && IndexCreatedAtPrevious.getMonth() === IndexCreatedAtNow.getMonth() && IndexCreatedAtPrevious.getDate() === IndexCreatedAtNow.getDate()) {
    //                 IndexCreatedAtNow.getHours() < IndexCreatedAtPrevious.getHours() ? setTimeTable(true) : setTimeTable(false);
    //             }
    //             else{setTimeTable(true)}
    //         }
    // }
    const elements = state.data.map((item) => {
                return(
                        <Message
                        key={item.id}
                        item={item}
                        // timeTable={timeTable}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onToggleLiked={onToggleLiked}
                        />
                )
    });
        return(
            <>
                <Header 
                    participants={NumbersOfParticipants}
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
