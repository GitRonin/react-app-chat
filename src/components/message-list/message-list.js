import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup } from 'reactstrap';
import './message-list.css';
import botAvatar from './botAvatar.svg';

const Title = styled.div`
    border: 2px solid;
    overflow: scroll;
    max-height: 360px;
    border-radius: 3px;
    position: relative;
`;
const TitleContainer = styled.div`
    width: 500px;
    height: 80px;
    margin: 40px 10px 5px 5px;
    border: 1px solid;
    background-color: #E6E6E6;
    display: flex;
    padding: 0px 10px 0px 0px;
    float: right;
`;



class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, avatar: "", label: "My chat", data: "14:00", like: true},
                {id: 2, avatar: "", label: "participants", data: "15:00", like: false},
                {id: 3, avatar: "", label: "messages", data: "16:00", like: true},
                {id: 4, avatar: "", label: "Last messager", data: "17:00", like: false},
                {id: 5, avatar: "", label: "12321421", data: "18:00", like: false}
            ]
        };
        this.onToggleLiked = this.onToggleLiked.bind(this);
    }
    onToggleLiked() {
        this.setState(() => {
            console.log('123');
        });
    }
    render() {
        const {onToggleLiked, like, id} = this.props;
        let ClassNames = '';
        if (like) ClassNames = 'heart';
    // const ArrayMessages = [
    //     {id: 1, avatar: "", label: "My chat", data: "14:00", like: true},
    //     {id: 2, avatar: "", label: "participants", data: "15:00", like: false},
    //     {id: 3, avatar: "", label: "messages", data: "16:00", like: true},
    //     {id: 4, avatar: "", label: "Last messager", data: "17:00", like: false},
    //     {id: 5, avatar: "", label: "12321421", data: "18:00", like: false}
    // ];

// const onToggleLiked = (item, id, ClassNames) => {
//     this.setState ({item.like: !this.state.like});
// };
    const elements = this.state.data.map((item) => {
        return  (
            <>
            {/* item.like ? 'heart' : '' */}
                <TitleContainer key={id} className={ClassNames} id="message" onClick={onToggleLiked}>
                        <img className="botAvatar" src={botAvatar} alt="Bot Avatar"/>
                        <p className="valueText" id="valueText">{item.label}</p>
                        <p className="MessageData">{item.data}</p>
                </TitleContainer>
            </>
        )
    });
        return(
            <Title>
                <ListGroup>
                    {elements}
                </ListGroup>
            </Title>
        )   
    }
}

    

export default MessageList;