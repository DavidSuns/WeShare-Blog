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

    var query = this.db.query('INSERT INTO post SET ?', [data], function (err, result) {

    	 typeof callback == "function" && callback(err, result);

    });

    console.log(query.sql);
};

Post.prototype.get = function(data, callback) {
    console.log("/model/Post.js/get");

    var result;
    var query = this.db.query('SELECT * FROM post', [null], function(err, result) {
        if(err) {
            console.log("error happens when get data from db");
        }
        result = result;
    });
    return result;
};

module.exports.Post = function () {
    return Post.getInst();
};

