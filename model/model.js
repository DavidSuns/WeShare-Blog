var mysql = require("mysql");
var crypto = require("crypto");

function Base() {

    this.db = this.db = mysql.createConnection({

        host: "localhost",
        user: "root",
        password: "13899538180sz",
        database: "weshare"
    });

    this.db.connect();

    this.table = "";
    this.relationship = {};

}

Base.prototype.setSuccess = function (message, data) {

    if (data == undefined) {
        data = {};
    }

    return {
        "error": 0,
        "message": message,
        "data": data
    }
};

Base.prototype.setFailed = function (message, data) {

    if (data == undefined) {
        data = {};
    }

    return {
        "error": 1,
        "message": message,
        "data": data
    }
};

Base.prototype.escape = function (data, body) {

    for (var prop in data) {

        if (body[prop]) {
            data[prop] = body[prop];
        }
    }

};

Base.prototype.getUUID = function () {
    try {

        // the performance isn't bad, but not as fast as PHP openssl extension
        // for running 1M, its three times slower than it in my laptop (1s:3s)

        var buf = crypto.randomBytes(5);
        return parseInt(buf.toString('hex', 0), 16);

    } catch (ex) {
        // handle error
        // most likely, entropy sources are drained
    }
};

module.exports.Base = Base;


