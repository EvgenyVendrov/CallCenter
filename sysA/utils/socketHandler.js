const controllers = require("../controllers/controllers");

module.exports = {
    init: (server) => {
        _socketIo = require("socket.io")(server);
        console.sysa("socketIO is connected");
        return _socketIo;
    },
    configureConnections: () => {
        _socketIo.on("connection", (socketWithNewClient) => {
            const nNumOfClientsConnected = controllers.clientConnected();
            _socketIo.emit("updNumOfClients", nNumOfClientsConnected);
            socketWithNewClient.on("callEnded", controllers.callEnded);

            socketWithNewClient.on("totalWaitingCalls", (nNumOfCallers) => {
                const currNumOfCallers = controllers.numOfCallersChanged(nNumOfCallers);
                socketWithNewClient.broadcast.emit("updNumOfCallers", currNumOfCallers);
            });

            socketWithNewClient.on("updSituationOfCenter", (situation) => {
                const _situation = controllers.situationChanged(situation);
                socketWithNewClient.broadcast.emit("updSituation", _situation);
            });

            socketWithNewClient.on("disconnect", () => {
                const nNumOfClientsConnected = controllers.clientDisconnected();
                _socketIo.emit("updNumOfClients", nNumOfClientsConnected);
            });
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