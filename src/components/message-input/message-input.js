import React, {Component} from 'react';
import './message-input.css';
import styled from 'styled-components'

const Title = styled.div`
    width: 500px;
`;
export default class MessageInput extends Component {
    render() {
        return (
                <Title>
                    <button
                        type="submit"
                        className="btn- btn-outline-secondary">
                        Send
                    </button>
                </Title>
        )
    }
}
