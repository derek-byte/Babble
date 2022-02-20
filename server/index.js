// Set up using express
const express = require('express')
const app = express()
// Build server with socket io
const http = require('http')
// Socket io deal with a lot of cors issues 
const cors = require('cors')
// Class Server from socket io library. We need to use curly braces because it is a class in the socket io library 
const { Server } = require("socket.io")

app.use(cors())

// Pass in express app to create a server 
const server = http.createServer(app);

// Create instance of server and deal with cors issues
const io = new Server(server, {
  cors: {
    // Tells which file is making calls to Socket io server
    origin: "http://localhost:3000",
    // Accept different types of requests 
    methods: ["GET", "POST"],
  },
})

// Detect if someone connects to socketio server, event with 'connection' id 
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} Joined Room: ${data}`)
    })
    // This is a socket io event called send_message that will accept data in variable, data
    socket.on('send_message', (data) => {
        console.log(data)
    })
    socket.on('disconnect', () => {
        console.log("User Disconnected", socket.id)
  })

})

// Listening to a port 
server.listen(3001, () => {
  console.log("SERVER RUNNING")
})