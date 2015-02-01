var model = require("./model.js");

function Post() {

    model.Base.call(this);
    this.table = "";
    // this.relationship = {
    //     oauth: "Post_oauth",
    //     Post_block: "Post_block",
    //     Post_image: "Post_image",
    //     Post_follow: "Post_follow",
    //     Post_stat: "Post_stat"
    // };
}

Post.prototype.constructor = Post;
Post.prototype = model.Base.prototype;

Post.inst = null;
Post.getInst = function () {

    if (Post.inst == null) {
        Post.inst = new Post();
    }

    return Post.inst;
}

Post.prototype.add = function (data, callback) {

    console.log("/model/Post.js/add");

    

    var self = this;

    var query = this.db.query('INSERT INTO post SET ?', [data], function (err, result) {

    	 typeof callback == "function" && callback(err, result);
        // if (err) {
        //     typeof callback == "function" && callback(err, result, data.Post_uuid);
        //     return;
        // }

        // data.oauth.Post_uuid = data.Post.Post_uuid;
        // data.oauth.date_added = data.Post.date_added;
        // data.oauth.date_modified = data.oauth.date_added;
        // data.oauth.status = 1;

        // self.db.query('INSERT INTO oauth SET ? ON DUPLICATE KEY UPDATE oauth_id=oauth_id', data.oauth, function (err, result) {
        //     typeof callback == "function" && callback(err, result, data.Post_uuid);
        // });

    });

    console.log(query.sql);
};

/**
 * To validate the existence of the Post and return it's record, here Post_uuid
 * is the open id for all Posts, and usually one Post_uuid with one unique
 * oauth_token, but email could be same, and Postname could be same too, because
 * Post could have same email or name for different oauth service, to test if
 * the Post already exists in the service, from mobile, it will send Post_uuid
 * if it's logged in local storage, and will send oauth token if it just logged
 * in.
 *
 * If it's Post_uuid, and it doesn't exist, this Post isn't valid, if it's token
 * and exists, it could be returned Post
 *
 * People said "don't use if exists update else insert in db", but how....
 *
 * @param data
 * @param callback
 */
// Post.prototype.exists = function (data, callback) {

//     console.log("/model/Post.js/exists");

//     var sql = "";
//     var parameter = [];

//     if (data['Post_uuid']) {
//         sql = "SELECT usr.*, oauth.token AS oauth_token FROM " + this.table
//             + " AS usr INNER JOIN " + this.relationship.oauth
//             + " AS oauth ON usr.Post_uuid=oauth.Post_uuid"
//             + " WHERE oauth.Post_uuid=?";
//         parameter[0] = data['Post_uuid'];
//     }

//     if (data['oauth_token']) {

//         sql = "SELECT usr.*, oauth.token AS oauth_token FROM " + this.table
//             + " AS usr INNER JOIN " + this.relationship.oauth
//             + " AS oauth ON usr.Post_uuid=oauth.Post_uuid"
//             + " WHERE oauth.token=? AND oauth.type=?";
//         parameter[0] = data['oauth_token'];
//         parameter[1] = data['oauth_type'];
//     }

//     var query = this.db.query(sql, parameter, function (err, result) {

//         typeof callback == "function" && callback(err, result, parameter);

//     });

//     console.log(query.sql);
// };

module.exports.Post = function () {
    return Post.getInst();
}

