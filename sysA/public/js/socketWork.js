

function initSocket() {
    socket = io.connect();

    socket.on("updNumOfClients", numberOfUsersConnected => {
        const numOfUsers = document.getElementById("num-of-users");
        numOfUsers.innerHTML = numberOfUsersConnected;
    });

    socket.on("updSituation", situation => {
        const centerSituation = document.getElementById("kind-of-call");
        for (elem of centerSituation) {
            elem.selected = false;
        }
        centerSituation.selectedIndex = situation;
        console.sysa(situation);
    });

    socket.on("updNumOfCallers", nNumOfCallers => {
        const numOfCallers = document.getElementById("total");
        numOfCallers.setAttribute("value", parseInt(nNumOfCallers));

    });
}

function sendMessage(total) {
    socket.emit("totalWaitingCalls", total);
}

function reportSituationChanged() {

    const situation = document.getElementById("kind-of-call");
    socket.emit("updSituationOfCenter", situation.value);
}

function emitCallData(rawCallData) {
    socket.emit("callEnded", rawCallData);

}