var assert = require("assert"),
    bigml = require("bigml"),
    path = require("path");
var scriptName = path.basename(__filename);
// var organization = process.env.BIGML_ORGANIZATION;



describe(scriptName + ": Connect with a BigML object", function () {
    var connection = new bigml.BigML(),
        connectionOrg = new bigml.BigML(undefined, undefined,
            { organization: organization }),
        orgProject = new bigml.Project(connectionOrg),
        reqOptions = {
            method: "GET",
            resourceType: "source",
            endpoint: "",
            query: undefined,
            headers: bigml.constants.ACCEPT_JSON
        },
        projectReqOptions = {
            method: "GET",
            resourceType: "project",
            endpoint: "",
            query: undefined,
            headers: bigml.constants.ACCEPT_JSON
        },
        orgProjectId;

    before(function (done) {
        orgProject.create({ "name": "Test project" }, function (error, data) {
            assert.equal(data.code, bigml.constants.HTTP_CREATED);
            orgProjectId = data.resource;
            done();
        });
    });

    describe("#request(options, callback)", function () {
        it("should connect without error with user's credentials", function (done) {
            connection.request(reqOptions, function (error, data, response) {
                assert.equal(error, null);
                done();
            });
        });
        it("should not connect with false credentials", function (done) {
            connection = new bigml.BigML("foo", "bar");
            connection.request(reqOptions, function (error, data, response) {
                assert.equal(data.code, bigml.constants.HTTP_UNAUTHORIZED);
                done();
            });
        });
        it("should connect with an organization", function (done) {
            connectionOrg.request(projectReqOptions, function (error, data, response) {
                assert.equal(error, null);
                assert.equal(data.objects[0].organization, organization);
                done();
            });
        });
    });
    after(function (done) {
        orgProject.delete(orgProjectId, function (error, data) {
            assert.equal(error, null);
            done();
        });
    });
});