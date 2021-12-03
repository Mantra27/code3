const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs');

const PORT = 1000;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html.html');
});

app.get('/:id', (req, res) => {
  res.sendFile(__dirname + '/room.html')

  io.on('connection', (socket) => {

    let pid = req.params.id.trim()
    if(pid.includes('favicon.png')){
      return;
    }

    if(pid.includes('favicon.ico')){
      return;
    }

    if(pid.includes('style.css')){
      return;
    }

    else{
      console.log("room name: ", pid)
      socket.emit('joinThis', pid)
    }
    
  })
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('client', (msg)=>{
      socket.to(msg.room).emit('chat message', msg)
    })

    socket.on('joinRoom', (room)=>{
      socket.join(room.room)
      console.log(room.user,'joined:', room.room)
      io.in(room.room).emit('updateUsers', room.user)
    })

    socket.on('compile', (e)=>{
      io.in(e).emit('compile-click')
    })

    socket.on('ip', (e)=>{
      console.log(e.responseJSON)
      logger(e.responseJSON.ipAddress);
      socket.emit('iptext', e.responseJSON.ipAddress)
    })

    socket.on('filechange', (e)=>{
        socket.emit('yourfilenameis', e)
    })
    

  });
  const logger = (ip)=>{
    const fs = require('fs');
    let data = fs.readFileSync('./log.txt','utf-8')
    let info = `IP: ${ip}, TIME: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}-${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`
    fs.writeFileSync(__dirname + '/log.txt', `${data} ${info}\n`)
}

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
  
