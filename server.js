// // Utilize socketio and port 3000
// // const io = require('socket.io')(3000)
// const io = require("socket.io")(3000, {
//     cors: {
//       origin: "https://localhost:5500",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   });

// // Every time a user loads the website, it will load this function, giving each user a socket
// io.on('connection', socket => {
//     console.log('new User')
//     socket.emit('chat-message', 'Hello World')
// })

const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require("socket.io")

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // Tells which file is making calls to Socket io server
    origin: "http:/localhost:3000",
    // Accept different types of requests 
    methods: ["GET", "POST"],
  },
})

io.on('connection', () => {
  console.log(socket.id)

  socket.on('disconnect', () => {
    console.log("User Disconnected", socket.id)
  })

})

server.listen(3001, () => {
  console.log("SERVER RUNNING")
})