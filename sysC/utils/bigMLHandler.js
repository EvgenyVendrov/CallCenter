const bigml = require("bigml");
const path = require("path");

const _userNAme = "EVGENYV94";
const _apiKey = "a2ba61cc0830894ad673c2cd64f2a1cf03558392";

module.exports = runBigML = () => {
    const connection = new bigml.BigML(_userNAme, _apiKey);
    Project = new bigml.Project(connectionOrg),
    reqOptions = {
        method: 'GET',
        resourceType: 'source',
        endpoint: '',
        query: undefined,
        headers: bigml.constants.ACCEPT_JSON
    },
    const pathForDataSet = path.join(__dirname, "..", "dataset", "dataset.json");


    // const source = new connection.Source();

    // connection.create(pathForDataSet, (err, sourceInfo) => {
    //     if (!err && sourceInfo) {
    //         const dataset = new bigml.Dataset();
    //         dataset.create(sourceInfo, (err, datasetInfo) => {
    //             if (!err && datasetInfo) {
    //                 const model = new bigml.Model();
    //                 model.create(datasetInfo, (err, modelInfo) => {
    //                     if (!err && modelInfo) {
    //                         const prediction = new bigml.Prediction();
    //                         prediction.create(modelInfo, { "petal length": 1 });
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // });

};
// var connection = new bigml.BigML(),
//     connectionOrg = new bigml.BigML(undefined, undefined,
//         { organization: organization }),
//     orgProject = new bigml.Project(connectionOrg),
//     reqOptions = {
//         method: 'GET',
//         resourceType: 'source',
//         endpoint: '',
//         query: undefined,
//         headers: bigml.constants.ACCEPT_JSON
//     },
//     projectReqOptions = {
//         method: 'GET',
//         resourceType: 'project',
//         endpoint: '',
//         query: undefined,
//         headers: bigml.constants.ACCEPT_JSON
//     },
//     orgProjectId;
