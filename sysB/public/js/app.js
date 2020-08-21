function initSocket() {
    socket = io.connect();

    socket.on("updNumOfCallers", nNumOfCallers => {
        const numOfCallers = document.getElementById("num-of-callers");
        numOfCallers.innerHTML = nNumOfCallers;
    });

    socket.on("updDataOfLast10MinAvg", nAvgData => {
        const data = document.getElementById("last-10-avg");
        data.innerHTML = nAvgData;
    });

    socket.on("newCallEnded", () => {
        location.reload();

    });

    socket.on("10mins", (new10MinsData) => {
        const data = document.getElementById("last-10-avg");
        data.innerHTML = new10MinsData;
    });
}

// function sendMessage(total) {
//     socket.emit("totalWaitingCalls", total);
// }

// function reportSituationChanged() {

//     const situation = document.getElementById("kind-of-call");
//     socket.emit("updSituationOfCenter", situation.value);
// }

// function emitCallData(rawCallData) {
//     socket.emit("callEnded", rawCallData);

// }