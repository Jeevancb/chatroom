import React, { useContext } from "react";

import { WebSocketContext } from "../contexts/WebSocketProvider";

const NewComponent = () => {
  const { state, dispatch } = useContext(WebSocketContext);

  const handleSendMessage = () => {
    if (state.isConnected && state.websocket) {
      state.websocket.send(JSON.stringify({ type: "ping" }));
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <p>Status: {state.isConnected ? "Connected" : "Disconnected"}</p>
      <button onClick={handleSendMessage}>Send Ping</button>
      {state.error && <p>Error: {state.error.message}</p>}
      <ul>
        {state.messages.map((message, index) => (
          <li key={index}>{JSON.stringify(message)}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewComponent;
