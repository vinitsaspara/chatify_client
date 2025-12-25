import { io } from "socket.io-client"

let socket = null;

export const connectSocket = (userId) => {
    // console.log(userId)
    socket = io("https://chatify-server-1-t3ob.onrender.com", {
        query: { userId },
    })

    return socket;
}

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}