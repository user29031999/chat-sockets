var messages = [];

export const MessagingSocket = (io) => {
    return (req, res) => {
        const message = req.body;
        console.log('message: ', message);
        messages.push(message);
        io.sockets.emit('messages', messages);
        res.status(201);
        res.end();
    }
};

function createMessagingController(io) {
    return Object.freeze({
        MessagingSocket: MessagingSocket(io),
    });
}

export default createMessagingController;