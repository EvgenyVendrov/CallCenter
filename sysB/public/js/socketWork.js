
function initSocket() {
    socket = io.connect();

    //to recive city names as written in the table + the topic of the call
    socket.on("updCityTopicTable", cityTopic => {
        console.log("update city- topic table EVENT");
        console.log(cityTopic);
        var city = cityTopic.city;
        var topic = cityTopic.topic;
        var id = city + topic;
        document.getElementById(id).innerHTML++;
        document.getElementById("total" + topic).innerHTML++;
        document.getElementById("totalCalls").innerHTML++;
    });


    //to recive new number of waiting calls in system (for graph)
    socket.on("updNumOfWaitingCallsRT", (newNum) => {
        console.log("update RT num of callers EVENT");
        const objToPush = {
            title: "wating calls",
            numOfCallers: newNum
        };
        numOfCallers[0] = objToPush;
        // refresh chart line, notice that in the $ you need to add the chart id like i did below
        $("#chart").dxChart("refresh");
    });

    //AVG call time of calls in the last 10 mins - to update every round min
    socket.on("updAvgOfLast10Mins", new10MinsData => {
        console.log("update 10 last mins AVG call length EVENT");
        const objToPush = {
            title: "wating time",
            avg: new10MinsData
        };
        avgWaiting[0] = objToPush;
        $("#timeWatingChart").dxChart("refresh");

    });

    //number of calls by lang grpah
    socket.on("updCallersByLang", groupedByLang => {
        console.log("update callers by lang EVENT");
        for (let lang in groupedByLang) {

            langSource.push({
                language: lang,
                amount: groupedByLang[lang]
            });
        }
        $("#languageChart").dxChart("refresh");
    });

    //number of calls by topic graph
    socket.on("updCallersByTopic", groupedByTopic => {
        console.log("update callers by topic EVENT");
        for (let topic in groupedByTopic) {
            topicSource.push({
                topic: topic,
                amount: groupedByTopic[topic]
            });
        }
        $("#topicChart").dxChart("refresh");
    });

    //grpah of active calls pre 5 min segment + waiting time split by 5 min segments
    socket.on("upd5minSeg", relCellsOfWholeDay => {
        console.log("update5 min seg EVENT");
        for (let index = 0; index < numOfCalls.length; index++) {
            if (numOfCalls[index].hour === relCellsOfWholeDay[0].hour) {
                console.log("TRUE!!!");
                let index2 = 0;
                while (index2 < relCellsOfWholeDay.length) {
                    console.log(numOfCalls[index]);
                    numOfCalls[index].calls++;
                    index2++;
                    index++;
                }
            }
        }
        $("#fiveMinAmountChart").dxChart("refresh");


        for (let index = 0; index < timeWatingCalls.length; index++) {
            if (timeWatingCalls[index].hour === relCellsOfWholeDay[0].hour) {
                console.log("TRUE!!!2");
                let index2 = 0;
                while (index2 < relCellsOfWholeDay.length) {
                    // console.log(timeWatingCalls[index]);
                    // console.log(relCellsOfWholeDay[index2]);
                    // console.log("BEFOR AT HOUR: ", timeWatingCalls[index].hour, "we had", timeWatingCalls[index].avgTime, "time");
                    timeWatingCalls[index].avgTime = relCellsOfWholeDay[index2].avgWaitingTime;
                    // console.log("AFTER AT HOUR: ", timeWatingCalls[index].hour, "we have", timeWatingCalls[index].avgTime, "time");
                    index2++;
                    index++;
                }
            }
        }
        $("#fiveMinWatingChart").dxChart("refresh");
    });


    socket.on("resetUI", () => {
        console.log("RESTARTING EVENT!");
        document.location.reload();
    });


}
