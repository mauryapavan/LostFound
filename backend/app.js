import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from 'method-override';
import http from 'http';
import apiroutes from "./routes/api.js";
const app = express();
const server = http.createServer(app);
import { Server } from "socket.io";
import Message from "./Model/message.js";
import chatapi from "./routes/chatapi.js";
import Timeupdate from "./chat/updatetimeofcontacts.js";
import items from "./Model/itemModel.js";
const io = new Server(server, { cors: { origin: '*' } });


dotenv.config();



app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(methodOverride('_method'));





dbconnect()
  .then(() => {
    console.log("succesfully connect database ")
  })
  .catch((err) => {
    console.log(err);
  })

// async function dbconnect() { await mongoose.connect("mongodb://127.0.0.1:27017/lostfound"); }
async function dbconnect() { await mongoose.connect(process.env.mongo_url); }

app.use('/api', apiroutes);
app.use('/chat', chatapi);
//  Store online users
app.get("/", (req, res) => {
  res.send("hii i am pawan maurya")
})



const onlineMap = new Map();


io.on('connection', (socket) => {
  socket.on('user:online', (userId) => {
    onlineMap.set(userId, socket.id);
     io.emit("onlineUsers", Array.from(onlineMap.keys()));
  });

  socket.on('chat:send', async (msg) => {
   
    // msg: { sender,receiver, text }
    const mg = new Message({ sender:msg.sender,receiver:msg.receiver,  message:msg.message });
    await mg.save();
     Timeupdate(msg.sender,msg.receiver,)
    // Emit to recipient if online
    const toSocket = onlineMap.get(msg.receiver);
 
    if (toSocket) io.to(toSocket).emit('receiveMessage', mg);
    // emit ack to sender
    socket.emit('receiveMessage', mg);
  });





  socket.on('disconnect', () => {
    // remove from onlineMap (simple linear cleanup)
    for (let [userId, sId] of onlineMap.entries()) if (sId === socket.id) onlineMap.delete(userId);
    io.emit("onlineUsers", Array.from(onlineMap.keys()));
    // console.log('socket disconnected', socket.id);
  });
});




const PORT = process.env.port || 3333;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});