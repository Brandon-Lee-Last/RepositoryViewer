const expect = require('chai').expect;
const request = require('request');

//Test the express fetch of the json files and data it returns.
describe('Status and content', function() {
    describe ('Users page', function() {
    it('status', function(done){
    request('http://localhost:5000/api/fetch/repo',//Fetches and tests repo fetch api
    function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
    });
    });
    it('status', function(done) {
    request('http://localhost:5000/api/fetch/users',//Fteches and tests user fetch api
    function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
    });
    });
    });
