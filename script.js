// Get location of our socket 
// const io = require("socket.io-client");

const io = require("socket.io-client");
const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

// const socket = io('http://localhost:3000')

socket.on('chat-message', data => {
    console.log(data)
})