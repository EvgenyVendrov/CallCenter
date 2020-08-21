// wating calls in bar chart function
$(function () {
    $("#chart").dxChart({
        dataSource: numOfCallers,
        series: {
            argumentField: "title",
            valueField: "numOfCallers",
            name: "number of calls in real time",
            type: "bar",
            color: "#ff7171"
        }
    });
});



// wating time in past 10 minuts bar chart function
$(function () {
    $("#timeWatingChart").dxChart({
        dataSource: avgWaiting,
        series: {
            argumentField: "title",
            valueField: "avg",
            name: "minuts",
            type: "bar",
            color: "#00bcd4"
        }
    });
});

// distribution of calls by language bar chart function
$(function () {
    $("#languageChart").dxChart({
        dataSource: langSource,
        palette: "soft",
        commonSeriesSettings: {
            type: "bar",
            valueField: "amount",
            argumentField: "language",
            ignoreEmptyPoints: true
        },
        seriesTemplate: {
            nameField: "language"
        }
    });
});

// distribution by topic bar chart function
$(function () {
    $("#topicChart").dxChart({
        dataSource: topicSource,
        palette: "soft",
        commonSeriesSettings: {
            type: "bar",
            valueField: "amount",
            argumentField: "topic",
            ignoreEmptyPoints: true
        },
        seriesTemplate: {
            nameField: "topic"
        }
    });
});

// 5 minuts wating calls aregression line chart function
$(function () {
    $("#fiveMinAmountChart").dxChart({
        dataSource: numOfCalls,
        commonSeriesSettings: {
            type: "line",
            argumentField: "hour",
            ignoreEmptyPoints: true
        },
        series: [
            { valueField: "calls", name: "number of calls" }
        ]
    });
});

// 5 minuts wting time aregression line chart function
$(function () {
    $("#fiveMinWatingChart").dxChart({
        dataSource: timeWatingCalls,
        commonSeriesSettings: {
            type: "line",
            argumentField: "hour",
            ignoreEmptyPoints: true
        },
        series: [
            { valueField: "avgTime", name: "wating time in minuts" }
        ]
    });
});
