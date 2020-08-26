
function initSocket() {
    socket = io.connect();

    //to recive city names as written in the table + the topic of the call
    socket.on("updCityTopicTable", nNumOfCallers => {
        document.location.reload();
    });

    //to recive time of call (5 min agr), num of calls and avg time of relevant cells in 5 mins array 
    socket.on("updDataOfLast10MinAvg", nAvgData => {
        document.location.reload();
    });

    //to recive new number of waiting calls in system (for graph)
    socket.on("newCallEnded", () => {
        document.location.reload();
    });

    //AVG call time of calls in the last 10 mins - to update every round min
    socket.on("10mins", (new10MinsData) => {
        document.location.reload();
    });

    //
}
