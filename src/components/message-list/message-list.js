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
`;
const TitleContainer = styled.div`
    width: 500px;
    height: 80px;
    border: 1px solid;
    background-color: #E6E6E6;
    display: flex;
    padding: 0px 10px 0px 0px;
    line-height: 35px;
    transition: 0.5s all;
    cursor: pointer;
    user-select: none;
`;
const TitleContainerFlex = styled.div`
    display: flex;
    margin: 40px 10px 5px 5px;
`;


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, avatar: "", label: "My chat", data: "14:00", like: false},
                {id: 2, avatar: "", label: "participants", data: "15:00", like: false},
                {id: 3, avatar: "", label: "messages", data: "16:00", like: false},
                {id: 4, avatar: "", label: "Last messager", data: "17:00", like: false},
                {id: 5, avatar: "", label: "12321421", data: "18:00", like: false},
                {id: 6, avatar: "", label: "12321421", data: "18:00", like: false}
            ],
        };
        this.onToggleLiked = this.onToggleLiked.bind(this);
        // this.filterPost = this.filterPost.bind(this);
        // this.onFilterSelect = this.onFilterSelect.bind(this);
        // this.searchPost = this.searchPost.bind(this);
    }
    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index]; 
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    // filterPost(items, filter) {
    //     if(filter === 'like') return items.filter(item => item.like);
    //     else return items;
    // }

    // onFilterSelect(filter) {
    //     this.setState({filter});
    // }

    // searchPost(items, term) {
    //     if (term.length === 0) return items
    //     return items.filter((item) => {
    //         return item.label.indexOf(term) > -1
    //     })
    // }

    render() {
        // const {term, filter} = this.state.data;
        // const liked = data.filter(item => item.like).length;
        // const allPosts = data.length;
        // const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    const elements = this.state.data.map((item) => {
        return  (
            <TitleContainerFlex>
                <TitleContainer key={item.id} id="message" onClick={() => this.onToggleLiked(item.id)}>
                        <img className="botAvatar" src={botAvatar} alt="Bot Avatar"/>
                        <p className="valueText" id="valueText">{item.label}</p>
                        <p className="MessageData">{item.data}</p>
                </TitleContainer>
                <p className={item.like ? 'heart' : ''}></p>
            </TitleContainerFlex>
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