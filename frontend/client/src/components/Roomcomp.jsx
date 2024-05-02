import React, { useState, useEffect, useRef } from "react";

function Roomcomp() {
  const [room_name, setroom_name] = useState("");
  const socket = useRef(null);
  const [rn, setrn] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setusername] = useState("");

  const date = new Date();
  console.log(date);

  const operate = Object.freeze({
    SEND_MSG: "SEND_MSG",
    RECIEVE_MSG: "RECIEVE_MSG",
    JOIN_ROOM: "JOIN_ROOM",
    LEAVE_ROOM: "LEAVE_ROOM",
  });

  useEffect(() => {
    if (rn) {
      socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${rn}/`);

      socket.current.onopen = () => {
        const msg = {
          action: operate.JOIN_ROOM,
          payload: {
            text: "Connected to room",
            date: date,
          },
          id: username,
        };
        socket.current.send(JSON.stringify(msg));
        console.log("WebSocket connection opened:", socket.current);
      };
      socket.current.onerror = (event) => {
        console.error("WebSocket error:", event);
      };

      socket.current.onclose = (event) => {
        setMessages(
          (prevMessages) => prevMessages + "\n" + "-----you left the chat------"
        );
        console.log("WebSocket connection closed:", event);
      };
      socket.current.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        switch (msg.action) {
          case "SEND_MSG":
            setMessages(
              (prevMessages) =>
                prevMessages +
                msg.username +
                ": " +
                msg.message.text +
                ".......date: " +
                msg.message.date +
                "\n"
            );
            break;
          case "RECIEVE_MSG":
            setMessages(
              (prevMessages) =>
                prevMessages +
                msg.username +
                ": " +
                msg.message.text +
                ".......date: " +
                msg.message.date +
                "\n"
            );
            break;
          case "JOIN_ROOM":
            setMessages(
              (prevMessages) =>
                prevMessages +
                "----------" +
                msg.username +
                " " +
                msg.message.text +
                "----------" +
                "\n"
            );
            break;
          case "LEAVE_ROOM":
            setMessages(
              (prevMessages) =>
                prevMessages +
                "----" +
                msg.username +
                " " +
                msg.message.text +
                "-----" +
                "\n"
            );
            break;
        }
      };
    }

    // Cleanup function to close the WebSocket connection when the component unmounts or when rn changes.
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [rn]);

  const leavechat = (e) => {
    const msg = {
      action: operate.LEAVE_ROOM,
      payload: {
        text: "left the room",
        date: date,
      },
      id: username,
    };
    socket.current.send(JSON.stringify(msg));
    socket.current.close();
  };

  async function sendText() {
    const msg = {
      action: operate.SEND_MSG,
      payload: {
        text: document.getElementById("text").value,
        date: date,
      },
      id: username,
    };
    socket.current.send(JSON.stringify(msg));
    document.getElementById("text1").value = "";
  }

  return (
    <div className="flex flex-col justify-items-center">
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          AKAI CHAT
        </span>{" "}
        room
      </h1>

      <label
        for="input-group-1"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Room Name
      </label>
      <div class="relative mb-6">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
        </div>
        <input
          type="text"
          id="user"
          value={room_name}
          placeholder="room name"
          onChange={(e) => setroom_name(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <label
        for="website-admin"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Username
      </label>
      <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </span>
        <input
          type="text"
          id="user"
          placeholder="enter your name"
          onChange={(e) => {
            setusername(e.target.value);
          }}
          class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setrn(room_name);
          }}
          class="text-white w-52 justify-center my-5 mx-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Join Room
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => leavechat(e)}
          class="text-white w-52 justify-center my-10  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Leave room
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
      <textarea className=" bg-lime-200  h-64" value={messages} readOnly />
      <br />

      <label for="chat" class="sr-only">
        Your message
      </label>
      <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <button
          type="button"
          class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              fill="currentColor"
              d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
            />
          </svg>
          <span class="sr-only">Upload image</span>
        </button>
        <button
          type="button"
          class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
            />
          </svg>
          <span class="sr-only">Add emoji</span>
        </button>
        <textarea
          id="text"
          rows="1"
          class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        <button
          type="submit"
          onClick={sendText}
          class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            class="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span class="sr-only">Send message</span>
        </button>
      </div>
    </div>
  );
}

export default Roomcomp;
