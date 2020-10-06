import React from 'react';
export default function AnyWay(props) {
    const {item, timeTable} = props;
        return(
            <div key={item.id}>
                <div className={timeTable ? "whenTrue" : "whenFalse"}>
                    <hr className="WhenTrueHR" color="black"/>
                    <div className="WhenTrueDivText">
                        <p className="WhenTrueText">Yesterday</p>
                    </div>
                </div>
                <div className={item.own ? "TitleContainerFlexCopied2" : "TitleContainerFlex"}>
                    <div className={item.own ? "btns-style" : "btn-style-none"}>
                            <p className={item.editedAt === "" ? "MessageWasEditedNone" : "MessageWasEdited"}>(edited)</p>
                        <div className="btns-style-btn">
                            <p className="btn-edit" onClick={() => props.onEdit(item.id)}/>
                            <p className="btn-delete" onClick={() => props.onDelete(item.id)}/>
                        </div>
                    </div>
                    <div className="TitleMessages" id="message" onClick={() => props.onToggleLiked(item.id)}>
                        <img className="MessageAvatar" src={item.avatar} alt="Bot Avatar"/>
                        <p className="MessageName">{item.user}</p>
                        <p className="MessageText" id="valueText">{item.text}</p>
                        <p className="MessageData">{item.createdAt.slice(11, -8)}</p>
                    </div>
                    <div className={item.own ? 'btn-style-none' : ''}>
                        <p className={item.editedAt === "" ? "MessageWasEditedNone" : "MessageWasEdited"}>(edited)</p>
                        <p className={item.like ? 'heart' : ''}></p>
                    </div>
                </div>
            </div>
        )
}