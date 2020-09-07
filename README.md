big data project - represents a COVID19 type of "call center" which is written using MVC design pattern, and includes three systems:

![whole sys](https://user-images.githubusercontent.com/44900773/92365567-ab06dd00-f0fc-11ea-8d01-861fb718f671.png)

1) sysA - Node.js EXPRESS server which serves a JS, EJS (using EJS view engine) & CSS  UI for "answering (reciving) calls", all clients are updated in RT using socketIO, this system is used to create the data, this data is then passed to KAFKA message broker which is hosted on Aiven cloud, the data is passed to two KAFKA topics - sysB and sysC.

*sysA UI done with JS, HTML, CSS & Bootstrap
![sysA](https://user-images.githubusercontent.com/44900773/92362394-9e808580-f0f8-11ea-90b8-e9aa1bb17a2f.jpg)

*aiven console to show the usage of cloud hosted KAFKA with two topics - two data pipelines
![aiven kafka console](https://user-images.githubusercontent.com/44900773/92363617-6da15000-f0fa-11ea-98f6-bbd78e2098a8.png)

2) sysB - Node.js EXPRESS server which recives data from KAFKA (sysA), stores it in REDIS which runs in a Docker container, and serves a NRT 24-hour dashboard (using DevExpress graphing library - DevExtreme Charts), updated in RT using SocketIO.

*redis DB which runs on a docker container
![aiven kafka console](https://user-images.githubusercontent.com/44900773/92363991-0d5ede00-f0fb-11ea-80f5-fc56ab2d0c8b.png)


3) sysC - Node.js EXPRESS server which recives the data from KAFKA and stores it in Mongodb-Atlas Cloud DB - in a collection by the date of the call

*MongoDB atlas data saved
![sysC mongoDB](https://user-images.githubusercontent.com/44900773/92363295-f1a70800-f0f9-11ea-8a8c-e8c6b91cdbd2.png)
