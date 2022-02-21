import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'
import App from './App';

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const [showApp, setShowApp] = useState(false)

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
            // await can only be used in async function to pause the code until the promise fufills 
            await socket.emit("send_message", messageData)
            // This is to make the message that we type to display on our own screen
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("")
        }
    }

    // Listen for events from the back-end, index.js
    // This is a useEffect hook that listens when there are any changes in the socket variable
    useEffect( () => {
        // Listen for event
        socket.on("recieve_message", (data) => {
            // Adding the new message to the old messages in the array 
            setMessageList((list) => [...list, data])
            console.log(data)
        })
    }, [socket])

    const joinApp = () => {
        setShowApp(true)
      }

  // Frontend 
  return (
    <div className="Chat">
    {/* Return back to the App.js page */}
    {!showApp ? (
    <div className="chat-window">
        <div className='chat-header'>
            <button onClick={joinApp}>&#x21e6;</button>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            {/* Automatically scroll chat to bottom */}
            <ScrollToBottom className="message-container">
                {/* Iterating through the messageList to output the messages 
                .map() is a for loop? */}
                {messageList.map((messageContent) => {
                    return (
                    // Determine whether you are you to change how your message looks in the css 
                    <div className="message" id={username === messageContent.author ? "you" : "other"}>
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" 
            // We now have control over the value and can set the value of currentMessage to be nothing 
            value={currentMessage}
            placeholder="Hey..." 
            // Function with the message stored in variable "event"
            onChange={(event) => {setCurrentMessage(event.target.value)}} 
            // If the user presses the enter key, goto the sendMessage function
            onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}
            />
            <button onClick={sendMessage}>&#x27A4;</button>
        </div>
    </div>
    ) : ( 
    // Goes to Chat.js
    <App/>
    )} 
    </div>
  )
}

export default Chat