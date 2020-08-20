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
                {id: 1, avatar: "", label: "My chat", data: "14:00", like: 'heart'},
                {id: 2, avatar: "", label: "participants", data: "15:00", like: ''},
                {id: 3, avatar: "", label: "messages", data: "16:00", like: 'heart'},
                {id: 4, avatar: "", label: "Last messager", data: "17:00", like: ''},
                {id: 5, avatar: "", label: "12321421", data: "18:00", like: ''}
            ],
            name: 'Коля'
        };
        // console.log(this.state.data);
    }
    onToggleLiked(item) {
        // this.setState({name: 'Толя'});
        this.setState(() => {
            if(item.like === 'heart') {
                item.like = '';
            }
            else{
                item.like = 'heart';
            }
        }); 
        console.log(item.like);
    }
    render() {

    const elements = this.state.data.map((item) => {
        return  (
            <>
            {/* () => this.onToggleLiked(item) */}
                <TitleContainer key={item} className={item.like} id="message" onClick={this.onToggleLiked.bind(this, item)}>
                        <img className="botAvatar" src={botAvatar} alt="Bot Avatar"/>
                        <p className="valueText" id="valueText">{item.label}</p>
                        <p className="MessageData">{item.data}</p>
                </TitleContainer>
                {/* <p>{this.state.name}</p> */}
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