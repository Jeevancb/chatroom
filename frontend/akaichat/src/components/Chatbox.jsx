import React from 'react'
import Message from './Message'
import { useContext } from 'react';
import { WebSocketContext } from '../contexts/WebSocketProvider';

function Chatbox() {
  const { state, dispatch } = useContext(WebSocketContext);

    const messages = state.new_messages
    console.log(messages)
  return (
    <div className="containerWrap pb-44 pt-20  ">
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </div>
  );
}

export default Chatbox
