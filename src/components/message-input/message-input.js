import React, {Component} from 'react';
import './message-input.css';

export default class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
                <button
                    type="submit"
                    className="btn- btn-outline-secondary">
                    Добавить
                </button>
        )
    }
}
