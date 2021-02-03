import React from 'react';
import {auth} from "../../service/firebase.js";
import {Link} from 'react-router-dom';
export default function AnyWay(props) {
    const {item, timeTable, typeChat, dataListBox} = props;
        return(
            <div key={item.id}>
                <div className={timeTable ? "whenTrue" : "whenFalse"}>
                    <hr className="WhenTrueHR" color="black"/>
                    <div className="WhenTrueDivText">
                        <p className="WhenTrueText">Yesterday</p>
                    </div>
                </div>
                <div className={item.userId === auth.currentUser.uid ? "TitleContainerFlexCopied2" : "TitleContainerFlex"}>
                    <div className={item.userId === auth.currentUser.uid ? "btns-style" : "btn-style-none"}>
                            <p className={item.editedAt === "" ? "MessageWasEditedNone" : "MessageWasEditedOwn"}>(edited)</p>
                        <div className="btns-style-btn">
                            <p className={item.like !== undefined && item.like.userLike !== 0 ? 'heartcopied2' : 'heartNumbersNone'}>{item.like !== undefined ? Object.keys(item.like.userLike).length : null}</p>
                            <p className="btn-edit" onClick={() => props.onEdit(item.id)}/>
                            <p className="btn-delete" onClick={() => props.onDelete(item.id)}/>
                        </div>
                    </div>
                    <div className="TitleMessages" id="message">
                        <img className="MessageAvatar" src={item.avatar} alt="Bot Avatar"/>
                        <p className="MessageName">{item.user}</p>
                        <p className="MessageText" id="valueText" onClick={() => props.onToggleLiked(item.id)}>{item.text}</p>
                        <p className="MessageData">{item.createdAt.slice(11, -8)}</p>
                        <p className={item.userId === auth.currentUser.uid || typeChat === "private" ? "MessageWasEditedNone" : "MessagePrivate"}>
                            <Link to={{
                            pathname: "/PrivateMessage",
                            item: item,
                            dataListBox: dataListBox
                            
                        }}>ЛС</Link>
                        </p>
                    </div>
                    <div className={item.userId === auth.currentUser.uid ? 'btn-style-none' : null}>
                        <p className={item.editedAt === "" ? "MessageWasEditedNone" : "MessageWasEdited"}>(edited)</p>
                        <p className={item.like !== undefined && item.like.userLike !== 0 ? 'heart' : 'heartNumbersNone'}>{item.like !== undefined ? Object.keys(item.like.userLike).length : undefined}</p>
                    </div>
                </div>
            </div>
        )
}