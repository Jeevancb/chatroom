import React, { createContext, useReducer,useState ,useEffect ,useRef} from "react";

// Define actions for the reducer
const ACTIONS = {
  WEBSOCKET_CONNECT: "WEBSOCKET_CONNECT",
  WEBSOCKET_CONNECT_SUCCESS: "WEBSOCKET_CONNECT_SUCCESS",
  WEBSOCKET_CONNECT_ERROR: "WEBSOCKET_CONNECT_ERROR",
  WEBSOCKET_CLOSE: "WEBSOCKET_CLOSE",
  WEBSOCKET_NEW_MESSAGE: "WEBSOCKET_NEW_MESSAGE",
  WEBSOCKET_OLD_MESSAGE: "WEBSOCKET_OLD_MESSAGE",
};

// Reducer function
const websocketReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.WEBSOCKET_CONNECT_SUCCESS:
      console.log("connected to server");
      return {
        ...state,
        websocket: action.payload.websocket.current,
        isConnected: true,
        error: null,
      };
    case ACTIONS.WEBSOCKET_CONNECT_ERROR:
      return {
        ...state,
        isConnected: false,
        error: action.payload.error,
      };
    case ACTIONS.WEBSOCKET_CLOSE:
      return {
        ...state,
        websocket: null,
        isConnected: false,
      };
    case ACTIONS.WEBSOCKET_NEW_MESSAGE:
      return {
        ...state,
        new_messages: [...state.new_messages, action.payload.message],
      };
    case ACTIONS.WEBSOCKET_OLD_MESSAGE:
      return {
        old_messages: action.payload.message,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  websocket: null,
  new_messages: [],
  old_messages:[],
  isConnected: false,
  error: null,
};

// Create WebSocketContext
const WebSocketContext = createContext();

// WebSocketProvider component
const WebSocketProvider = ({ children }) => {
  const[rn,setrn]=useState(null); 
  const [username,setusername]=useState("");
  const websocket = useRef(null);
  const [state, dispatch] = useReducer(websocketReducer, initialState);

  // Connect to WebSocket when component mounts
  useEffect(() => {
    if(rn){
       websocket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${rn}/`);

    websocket.current.onopen = () => {
      // const msg = {
      //   from: username,
      //   command: "fetch_messages",
      // };
      // websocket.current.send(JSON.stringify(msg));
      dispatch({
        type: ACTIONS.WEBSOCKET_CONNECT_SUCCESS,
        payload: { websocket },
      });
    };

    websocket.current.onerror = (error) => {
      dispatch({ type: ACTIONS.WEBSOCKET_CONNECT_ERROR, payload: { error } });
    };

    websocket.current.onclose = () => {
      dispatch({ type: ACTIONS.WEBSOCKET_CLOSE });
    };

    websocket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Message received', message);
      if(message.command === "new_message"){
      dispatch({ type: ACTIONS.WEBSOCKET_NEW_MESSAGE, payload: { message } });
    }
      else {     
      dispatch({ type: ACTIONS.WEBSOCKET_OLD_MESSAGE, payload: { message } });
    }

    };}

    return () => {
        if (websocket.current) {
          websocket.current.close();
        }
    };
  }, [rn]);

  return (
    <WebSocketContext.Provider value={{ state, dispatch ,setrn, username, setusername }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider, ACTIONS };
