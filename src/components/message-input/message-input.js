import React, {useState} from 'react';
import './message-input.css';

export default function MessageInput(props) {
    const [state, setState] = useState({text: ''});
    const onValueChange = e => {
        setState({
            text: e.target.value
        });
    }
    const onSubmit = e => {
        e.preventDefault();
        props.onAdd(state.text);
        setState({
            text: ''
        });
    }
        return (
            <form
            className="bottom-panel d-flex"
            onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Message"
                    className="form-control new-post-label"
                    onChange={onValueChange}
                    value={state.text}
                    />
                <button
                    type="submit"
                    className="btn- btn-outline-secondary">
                    Send
                </button>
            </form> 
        )
}