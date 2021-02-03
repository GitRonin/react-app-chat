import React, { useState, useEffect } from 'react';
import MessageInput from '../../components/message-input/message-input';
import Header from '../../components/header/header';
import './message-list.css';
import Message from '../../components/message/message';
import {datebaseMessages} from '../../service/firebase.js';
import {auth} from '../../service/firebase.js';
import {Link} from 'react-router-dom';

export default function MessageList(props) {
    // var timeTable = false;
    const date = new Date();
    const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const [state, setState] = useState({data: []}); 
    const [publicKey, setPublicKey] = useState([]);
    const [objectKeys, setObjectKeys] = useState();
    const [dataListBox, setDataListBox] = useState([]);
    // const {itemListBox} = props.location;
    // const [timeTable, setTimeTable] = useState(false);
    // const [NumbersOfParticipants, setNumbersOfParticipants] = useState(0);
    
    useEffect(_ => {
        // datebaseMessages.ref(`chats/private`).on('value', snap => {
        //     if(snap.val() !== null){
        //         for (const key in snap.val()) {
        //             if(snap.val()[key].messages !== undefined){
        //                 if(Object.values(snap.val()[key].participants).includes(auth.currentUser.uid)){
        //                     dataListBox.push(key);
        //                 }
        //             }
        //         }
        //     }
        // });
        datebaseMessages.ref(`chats/public`).on('value', snap => {
            setPublicKey(datebaseMessages.ref(`chats/public`).push().key);
                if(snap.val() !== null){
                    for (const key in snap.val()) {
                        if(snap.val()[key].messages !== undefined){
                            if(Object.values(snap.val()[key].participants).includes(auth.currentUser.uid)){
                                // dataListBox.push(key);
                                setState({data: Object.values(snap.val()[key].messages)})
                                setPublicKey(key);
                                setObjectKeys(Object.keys(snap.val()[key].messages));
                            }
                        }
                    }
                // NumbersOfUsers(snap.val());
                // timeTableFunction(snap);
        }});
    }, []);
    const onToggleLiked = id => {
        setState(({data}) => {
                let onUserLike, newItem, isExists = true;
                const index = data.findIndex(elem => elem.id === id);
                const old = data[index];
                datebaseMessages.ref(`chats/public/${publicKey}/messages/${objectKeys[index]}/like/userLike`).on('value', snap => onUserLike = snap.val() );
                if(onUserLike !== null){
                    for (const key in onUserLike) {
                        if(onUserLike[key] === auth.currentUser.uid){
                            delete onUserLike[key];
                            newItem = {...old, like: {onUserLike: onUserLike}};
                            isExists = false;
                            datebaseMessages.ref(`chats/public/${publicKey}/messages/${objectKeys[index]}/like/userLike`).set(onUserLike);
                        }
                    }
                }
                if(isExists){
                    datebaseMessages.ref(`chats/public/${publicKey}/messages/${objectKeys[index]}/like/userLike`).push().set(auth.currentUser.uid);
                    newItem = {...old, like: {userLike: old.like !== undefined && old.like !== null ? (
                        [old.like.userLike].push(auth.currentUser.uid) ) : ( auth.currentUser.uid) }};
                }
                const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
                return {
                    data: newArr
                }
        });
    }
    const onEdit = id => {
        setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newLabel = prompt("Edit");
            const newItem = {...old, text: newLabel, editedAt: isoDate};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            datebaseMessages.ref(`chats/public/${publicKey}/messages/${objectKeys[index]}/`).update({text: newLabel, editedAt: isoDate});
            return {
                data: newArr
            }
        });
    }
    const onDelete = id => {
        setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = data.filter(elem => elem.id !== id);
            datebaseMessages.ref(`chats/public/${publicKey}/messages/${objectKeys[index]}/`).remove();
            return{
                data: newArr
            }
        });
    }
    const onAdd = labelText => {
        datebaseMessages.ref(`chats/public/${publicKey}/participants`).on('value', snap2 => {
            if(snap2.val() === null || Object.values(snap2.val()).includes(auth.currentUser.uid) === false){
                datebaseMessages.ref(`chats/public/${publicKey}/participants`).push(auth.currentUser.uid);
            }
        });
        const newItem = {
            id: `${datebaseMessages.ref(`chats/public/${publicKey}/messages/`).push().key}`,
            userId: auth.currentUser.uid,
            avatar: "https://ru.botlibre.com/images/avatar.png",
            user: auth.currentUser.displayName,
            text: labelText,
            createdAt: isoDate,
            editedAt: "",
            like: {
                userLike: ""
            }, 
        };
        datebaseMessages.ref(`chats/public/${publicKey}/messages`).push().set(newItem);
        setState({data: state.data === undefined || state.data === null ? newItem : [...state.data, newItem]});
    }

    // const NumbersOfUsers = data => {
    //     const userIds = data.map(message => message.userId);
    //     const numberOfUsers = [...new Set(userIds)].length;
    //     setNumbersOfParticipants(numberOfUsers);
    // }

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
    // // }
    const dataListBoxPublic = dataListBox === undefined || dataListBox === null ? null : dataListBox.map((itemListBox) => {
        return(
            <div>
                <Link to={{                                
                    pathname: '/PrivateMessage',
                    itemListBox: itemListBox
                }}>{itemListBox}</Link>
            </div>
        )
    });

    const elements = state.data === undefined || state.data === null ? null : state.data.map(item => {
        return(
                <Message
                dataListBox={dataListBox}
                typeChat="public"
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
                <div className="messageList">
                    <div>
                        <Header
                            typeChat="Public"
                            // participants={NumbersOfParticipants}
                            messages={state.data.length}
                            lastMessage={state.data.length ? state.data[state.data.length - 1].createdAt.slice(11, -8) : ''}
                            />
                        <div className="title">
                            {elements}
                        </div>
                        <MessageInput
                            className="Mymessage" 
                            onAdd={onAdd}/>
                    </div>
                    <div className="mainBoxPrivateMessages">
                        {dataListBoxPublic}
                    </div>
                </div>
                  <button onClick={() => auth.signOut()}>Sign out</button>
            </>
        )   
}
