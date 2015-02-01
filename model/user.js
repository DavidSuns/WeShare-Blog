var model = require("./model.js");

function User() {

    model.Base.call(this);
    this.table = "";
    this.relationship = {
        oauth: "user_oauth",
        user_block: "user_block",
        user_image: "user_image",
        user_follow: "user_follow",
        user_stat: "user_stat"
    };
}

User.prototype.constructor = User;
User.prototype = model.Base.prototype;

User.inst = null;
User.getInst = function () {

    if (User.inst == null) {
        User.inst = new User();
    }

    return User.inst;
}

User.prototype.add = function (data, callback) {

    console.log("/model/user.js/add");

    data.user.user_uuid = this.getUUID() + "";
    data.user.date_added = parseInt((new Date()).getTime() / 1000);
    data.user.date_modified = data.user.date_added;

    data.update = {
        date_modified: data.user.date_modified
    };

    var self = this;

    var query = this.db.query('INSERT INTO user SET ? ON DUPLICATE KEY UPDATE ?', [data.user, data.update], function (err, result) {

        if (err) {
            typeof callback == "function" && callback(err, result, data.user_uuid);
            return;
        }

        data.oauth.user_uuid = data.user.user_uuid;
        data.oauth.date_added = data.user.date_added;
        data.oauth.date_modified = data.oauth.date_added;
        data.oauth.status = 1;

        self.db.query('INSERT INTO oauth SET ? ON DUPLICATE KEY UPDATE oauth_id=oauth_id', data.oauth, function (err, result) {
            typeof callback == "function" && callback(err, result, data.user_uuid);
        });

    });

    console.log(query.sql);
};

/**
 * To validate the existence of the user and return it's record, here user_uuid
 * is the open id for all users, and usually one user_uuid with one unique
 * oauth_token, but email could be same, and username could be same too, because
 * user could have same email or name for different oauth service, to test if
 * the user already exists in the service, from mobile, it will send user_uuid
 * if it's logged in local storage, and will send oauth token if it just logged
 * in.
 *
 * If it's user_uuid, and it doesn't exist, this user isn't valid, if it's token
 * and exists, it could be returned user
 *
 * People said "don't use if exists update else insert in db", but how....
 *
 * @param data
 * @param callback
 */
User.prototype.exists = function (data, callback) {

    console.log("/model/user.js/exists");

    var sql = "";
    var parameter = [];

    if (data['user_uuid']) {
        sql = "SELECT usr.*, oauth.token AS oauth_token FROM " + this.table
            + " AS usr INNER JOIN " + this.relationship.oauth
            + " AS oauth ON usr.user_uuid=oauth.user_uuid"
            + " WHERE oauth.user_uuid=?";
        parameter[0] = data['user_uuid'];
    }

    if (data['oauth_token']) {

        sql = "SELECT usr.*, oauth.token AS oauth_token FROM " + this.table
            + " AS usr INNER JOIN " + this.relationship.oauth
            + " AS oauth ON usr.user_uuid=oauth.user_uuid"
            + " WHERE oauth.token=? AND oauth.type=?";
        parameter[0] = data['oauth_token'];
        parameter[1] = data['oauth_type'];
    }

    var query = this.db.query(sql, parameter, function (err, result) {

        typeof callback == "function" && callback(err, result, parameter);

    });

    console.log(query.sql);
};

module.exports.user = function () {
    return User.getInst();
}