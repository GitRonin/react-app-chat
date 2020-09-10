import React, {Component} from 'react';
import './message-input.css';

export default class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }
    onValueChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.text);
        this.setState({
            text: ''
        });
    }
    render() {
        return (
            <form 
            className="bottom-panel d-flex"
            onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="Message"
                    className="form-control new-post-label"
                    onChange={this.onValueChange}
                    value={this.state.text}/>
                <button
                    type="submit"
                    className="btn- btn-outline-secondary">
                    Send
                </button>
            </form> 
        )
    }
}
