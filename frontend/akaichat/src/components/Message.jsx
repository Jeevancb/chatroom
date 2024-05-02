import React, { useContext } from 'react'
import { WebSocketContext } from '../contexts/WebSocketProvider';

const Message = ({message}) => {
  const{username}=useContext(WebSocketContext)
  if (username !== message.message.author) {
    return (
      <div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            {message.message.author}
            <time className="text-xs opacity-50">
              {message.message.timestamp}
            </time>
          </div>
          <div className="chat-bubble">{message.message.message}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            {message.message.author}
            <time className="text-xs opacity-50">{message.message.timestamp}</time>
          </div>
          <div className="chat-bubble">{message.message.message}</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
    );
  }
   
}

export default Message
