var post = require("./controllers/post").post();

var table = {
	"/post" : post.add
};

module.exports.table = table;