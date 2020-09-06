big data project, which represents a COVID19 type of "call center" which includes three systems:

1) sysA - Node.js EXPRESS server which serves a JS,EJS (using EJS view engine) & CSS  UI for "answering (reciving) calls", all clients are updated in RT using socketIO, this system is used to create the data, this data is then passed to KAFKA message broker which is hosted on Aiven cloud, the data is passed to two KAFKA topics - sysB and sysC.

2) sysB - Node.js EXPRESS server which recives data from KAFKA (sysA), stores it in REDIS which runs in a Docker container, and serves a NRT 24-hour dashboard (using DevExpress graphing library - DevExtreme Charts).

3) sysC - Node.js EXPRESS server which recives the data from KAFKA and stores it in Mongodb-Atlas Cloud DB - in a collection by the date of the call
