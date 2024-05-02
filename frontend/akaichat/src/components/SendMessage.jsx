import React from 'react'
import { useContext } from 'react';
import { WebSocketContext } from '../contexts/WebSocketProvider';

const SendMessage = () => {
    const[message, setMessage] = React.useState("")
    const {state,username} = useContext(WebSocketContext);
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Format the time as a string with AM/PM
    const currentTime = ` ${hours12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    const handleSendMessage = (e)=>{
        e.preventDefault()
         const msg = {
           from: username,
           text: message,
           command: "new_message"
         };
            if (state.isConnected && state.websocket) {
              state.websocket.send(JSON.stringify(msg));
            
          };
          setMessage('')
    }
  return (
    <div className=" bg-base-200 fixed bottom-0 w-full py-5 shadow-lg">
      <form onSubmit={handleSendMessage} className="containerWrap flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="messages..."
          className="textarea textarea-bordered focus:outline-none  rounded-r-none  textarea-xs w-full "
        ></input>
        <button
          type="submit"
          className="btn btn-outline btn-primary rounded-l-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default SendMessage
