import React, { useState } from "react";


function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("")

    // Async means to always return a value, (we wait for the message to be sent)
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                // Get the current time 
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
        }
    }

  return (
    <div>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>

        </div>
        <div className='chat-footer'>
            <input type="text" placeholder="Hey..." onChange={(event) => {setCurrentMessage(event.target.value)}}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat