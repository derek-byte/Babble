import './App.css';
import React, { useState } from "react";
import Chat from './Chat';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      // Emit interacts with socket event to send data
      socket.emit("join_room", room)
      // Make it chat show on the screen
      setShowChat(true)
    }
  }

  return (
  <div className="App">
    {!showChat ? (
      <div className="joinChatContainer">  
        <h3>Join A Chat</h3>
        <input type="text" placeholder="User..." onChange={(event) => {setUsername(event.target.value)}}/>
        <input type="text" placeholder="Room ID..." onChange={(event) => {setRoom(event.target.value)}}/>
        <button onClick={joinRoom}>Join A Room</button>
      </div>

      ) : (
        // {/* Goes to Chat.js  */}
        <Chat socket={socket} username={username} room={room} />
      )}
  </div>)
}

export default App;