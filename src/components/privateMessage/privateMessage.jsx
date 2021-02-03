import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../service/firebase.js';
import Message from '../message/message.js';
import {datebaseMessages} from '../../service/firebase.js';
import MessageInput from '../../components/message-input/message-input.js';
import './privateMessage.css';
import Header from '../header/header.js';

export default function PrivateMessage(props) {
    const [state, setState] = useState({data: []});
    const [privateKey, setPrivateKey] = useState([]);
    const [objectKeys, setObjectKeys] = useState(0);
    const date = new Date();
    const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const {item, dataListBox} = props.location;
    useEffect(_ => {
        // datebaseMessages.ref(`chats/public`).on('value', snap => {
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
        datebaseMessages.ref(`chats/private`).on('value', snap => {
            const privateRef = datebaseMessages.ref(`chats/private`).push();
            setPrivateKey(privateRef.key);
            if(snap.val() !== null){
                for (const key in snap.val()) {
                    if(snap.val()[key].messages !== undefined){
                        if(Object.values(snap.val()[key].participants).includes(auth.currentUser.uid) && Object.values(snap.val()[key].participants).includes(props.location.item.userId)){
                            // dataListBox.push(key);
                            setState({data: Object.values(snap.val()[key].messages)})
                            setPrivateKey(key);
                            setObjectKeys(Object.keys(snap.val()[key].messages));
                        }
                    }
                }
            }
            else{
                datebaseMessages.ref(`chats/private/${privateRef.key}/participants`).push().set(auth.currentUser.uid);
                datebaseMessages.ref(`chats/private/${privateRef.key}/participants`).push().set(item.userId);
                setPrivateKey(privateRef.key);
                setObjectKeys(Object.keys(snap.val()[0].messages));
            }
        });
    }, []);
    const onToggleLiked = id => {
        setState(({data}) => {
                let onUserLike, newItem, isExists = true;
                const index = data.findIndex(elem => elem.id === id);
                const old = data[index];
                datebaseMessages.ref(`chats/private/${privateKey}/messages/${objectKeys[index]}/like/userLike`).on('value', snap => onUserLike = snap.val() );
                if(onUserLike !== null){
                    for (const key in onUserLike) {
                        if(onUserLike[key] === auth.currentUser.uid){
                            delete onUserLike[key];
                            newItem = {...old, like: {onUserLike: onUserLike}};
                            isExists = false;
                            datebaseMessages.ref(`chats/private/${privateKey}/messages/${objectKeys[index]}/like/userLike`).set(onUserLike);
                        }
                    }
                }
                if(isExists){
                    datebaseMessages.ref(`chats/private/${privateKey}/messages/${objectKeys[index]}/like/userLike`).push().set(auth.currentUser.uid);
                    newItem = {...old, like: {userLike: old.like !== undefined && old.like !== null ? (
                        [old.like.userLike].push(auth.currentUser.uid) ) : ( auth.currentUser.uid) }};
                }
                const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
                return {
                    data: newArr
                }
        });
    }

    const onAdd = labelText => {
        const newItem = {
            id: `${datebaseMessages.ref(`chats/private/${privateKey}/messages/`).push().key}`,
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
        datebaseMessages.ref(`chats/private/${privateKey}/messages`).push().set(newItem);
        setState({data: state.data === undefined || state.data === null ? newItem : [...state.data, newItem]});
    }

    const onEdit = id => {
        setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newLabel = prompt("Edit");
            const newItem = {...old, text: newLabel, editedAt: isoDate};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            datebaseMessages.ref(`chats/private/${privateKey}/messages/${objectKeys[index]}/`).update({text: newLabel, editedAt: isoDate});
            return {
                data: newArr
            }
        });
    }

    const onDelete = id => {
        setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = data.filter(elem => elem.id !== id);
            datebaseMessages.ref(`chats/private/${privateKey}/messages/${objectKeys[index]}/`).remove();
            return{
                data: newArr
            }
        });
    };

    const dataListBoxPrivate = dataListBox === undefined || dataListBox === null ? null : dataListBox.map((itemListBox) => {
        return(
            <div>
                <Link to={{                                
                    pathname: '/',
                    itemListBox: itemListBox
                }}>{itemListBox}</Link>
            </div>
        )
    });

    const elements = state.data === undefined || state.data === null ? null : state.data.map((item) => {
        return(
            <Message
            typeChat="private"
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
        <div className="flex">
            <div>
                <Header 
                    typeChat="Private"
                    //  participants={NumbersOfParticipants}
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
                {/* {dataListBoxPrivate} */}
                <Link to="/">Back</Link>
            </div>
        </div>
        <button onClick={() => auth.signOut()}>Sign out</button>
        </>
    )
}