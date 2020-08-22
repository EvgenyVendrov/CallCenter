module.exports = {
    init: (server) => {
        _socketIo = require("socket.io")(server);
        console.sysb("socketIO is connected");
        return _socketIo;
    },
    configureConnections: () => {
        _socketIo.on("connection", (socket) => {
            console.sysb("client connected!");
            
            // socket.on("")
        });
    },
    getSocket: () => {
        if (_socketIo) {
            return _socketIo;
        }
        else {
            throw new error("socketIO yet to be connected");
        }
    }
};