var assert = require("assert")
var http = require('http');
var querystring = require('querystring');

describe('HTTP POST: /posts/add', function () {
    describe('returned value', function () {
        it('should not be empty', function (done) {

            var string = {
                title : "title",
                content : "content",
                author: "111" 
            };

            string = querystring.stringify(string);
            // console.log(string);

            var options = {
                hostname: '127.0.0.1',
                port: 8000,
                path: '/posts',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': string.length
                }
            };

            var req = http.request(options, function (res) {

                //console.log(res);

                res.setEncoding('utf8');
                res.on('data', function (chunk) {

                    console.log("\n\tRES.BODY: " + chunk + "\n");

                    assert.equal(true, chunk.length > 0);
                    done();
                });
            });

            req.on('error', function (e) {
                console.log('problem with request: ' + e.message);
            });

            req.write(string);
            req.end();

        });
    });
});

describe("HTTP GET /posts", function() {
    describe("return value", function() {
        it("Should not be empty", function(done) {

            http.get("http://localhost:8000/posts", function(res) {
               res.on("data", function(chunk) {
                    console.log("\n\tRES.BODY: " + chunk + "\n");
                    assert.equal(true, chunk.length > 0);
                    done();
               });

               res.on("error", function(e) {
                    console.log("problem with request" + e.message);
               });

            });
        })
    })
});

describe("HTTP GET /posts/:id", function() {
    describe("return value", function() {
        it("Should not be empty", function(done) {

            http.get("http://localhost:8000/posts/1", function(res) {
               res.on("data", function(chunk) {
                    console.log("\n\tRES.BODY: " + chunk + "\n");
                    assert.equal(true, chunk.length > 0);
                    done();
               });

               res.on("error", function(e) {
                    console.log("problem with request" + e.message);
               });

            });
        })
    })
});


describe("HTTP DELETE /posts/:id", function() {
    describe("delete successful", function() {
        it("return success message", function(done) {
            var options = {
                hostname : "127.0.0.1",
                port: 8000,
                path: "/posts/1",
                method : "DELETE"
                // headers : {

                // } 
            };
            http.request(options, function(res) {
               res.on("data", function(chunk) {
                    console.log("\n\tRES.BODY: " + chunk + "\n");
                    assert.equal(true, chunk.length > 0);
                    done();
               });

               res.on("error", function(e) {
                    console.log("problem with request" + e.message);
               });

            });
        })
    })
});