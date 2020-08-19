import React, {Component} from 'react';
//import MessageList from '../message-list/message-list';
import './message-input.css';

export default class MessageInput extends Component {
    // this.onSubmit = this.onSubmit.bind(this);
    
    // onSubmit(e) {
    //     e.preventDefault();
    // }
    render() {
        return (
                <>
                    <form className="bottom-panel d-flex">
                    <input
                        type="text"
                        placeholder="Message"
                        className="form-control new-post-label"/>
                    <button
                        type="submit"
                        className="btn- btn-outline-secondary">
                        Send
                    </button>
                    </form> 
                </>
        )
    }
}
