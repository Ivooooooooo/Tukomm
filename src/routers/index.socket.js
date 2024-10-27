import { socketServer } from "../../server.js";

let messageHistory = [
    {
        username: "testUser",
        message: "Hola, este es el primer mensaje.",
    },
];

const socketCb = (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.emit("all messages", getRecentMessages());

    socket.on("new message", (newMessage) => {
        messageHistory.push(newMessage);
        socketServer.emit("all messages", getRecentMessages());
    });
};

const getRecentMessages = () => {
    return messageHistory.slice(-10);
};

export default socketCb;