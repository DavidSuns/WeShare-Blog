var model = require("./model.js");

function Post() {

    model.Base.call(this);
    this.table = "";
}

Post.prototype.constructor = Post;
Post.prototype = model.Base.prototype;

Post.inst = null;
Post.getInst = function () {

    if (Post.inst === null) {
        Post.inst = new Post();
    }

    return Post.inst;
}

Post.prototype.add = function (data, callback) {

    console.log("/model/Post.js/add");

    this.db.query('INSERT INTO post SET ?', [data], function (err, result) {
    	 typeof callback == "function" && callback(err, result.message);
    });

    console.log(query.sql);
};

Post.prototype.get = function(data, callback) {
    console.log("/model/Post.js/get");
    var query = "";

    if(data) {
        query = "SELECT * FROM post WHERE post_id=" + data;   
    } else {
        query = 'SELECT * FROM post';
    }

    this.db.query(query, function(err, rows) {
        if(err) {
            console.log("error happens when get data from db");
            return;
        }
        typeof callback == "function" && callback(err, rows);
    });
};

Post.prototype.delete = function(data, callback) {
    var query = "DELETE FROM post WHERE post_id=" + data;
    this.db.query(query, function(err, result) {
        if(err) {
            console.log("error happends when delete data from db");
            return;
        } 
        typeof callback == "function" && callback(err, result);
    });
};

module.exports.Post = function () {
    return Post.getInst();
};

