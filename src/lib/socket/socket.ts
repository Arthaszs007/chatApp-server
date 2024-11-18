import { Server } from "socket.io";



export const createSocketServer =(port:number)=>{

    const io = new Server(port,{})
    
    io.on("connection",(socket)=>{
        console.log("------socket connected-------")
        console.log(`[${new Date().toISOString()}]`)
        socket.emit("hello","welcome")


        socket.on("disconnect",()=>{
            console.log("client disconnected")
        })
    
        socket.on("reconnect",()=>{
            console.log("client is reconnecting")
        })
    })


}

