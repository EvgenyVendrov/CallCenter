

function initSocket() {
    socket = io.connect();

    socket.on("updNumOfCallers", nNumOfCallers => {
        document.location.reload();
    });

    socket.on("updDataOfLast10MinAvg", nAvgData => {
        document.location.reload();
    });

    socket.on("newCallEnded", () => {
        document.location.reload();
    });

    socket.on("10mins", (new10MinsData) => {
        document.location.reload();
    });
}
