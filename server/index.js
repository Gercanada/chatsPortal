import  express  from "express";
import http from "http"
import { Server as SocketServer} from "socket.io";

const app = express()
const server = http.createServer(app)
// const io = new SocketServer(server,{
//     cors:{
//         origin:'http://localhost:3000'
//     }
// })
const io = new SocketServer(server)

io.on('connection',socket => {
    console.log('client connected')
    socket.on('message',(data)=>{
        data.message_type='response'
        socket.broadcast.emit('message',data)
    })
})
server.listen(4000)
console.log('server on port',4000)