
function initSocket() {
    socket = io.connect();

    //to recive city names as written in the table + the topic of the call
    socket.on("updCityTopicTable", nNumOfCallers => {

    });

    //to recive time of call (5 min agr), num of calls and avg time of relevant cells in 5 mins array 
    socket.on("upd5minSeg", nAvgData => {

    });

    //to recive new number of waiting calls in system (for graph)
    socket.on("updNumOfWaitingCallsRT", () => {

    });

    //AVG call time of calls in the last 10 mins - to update every round min
    socket.on("updAvgOfLast10Mins", (new10MinsData) => {

    });

    //number of calls by lang grpah

    socket.on("updCallersByLang", nNumOfCallers => {

    });

    //number of calls by topic graph

    socket.on("updCallersByTopic", nNumOfCallers => {

    });

    //grpah of active calls pre 5 min segment + waiting time split by 5 min segments

    socket.on("upd5minSeg", nNumOfCallers => {

    });



}
