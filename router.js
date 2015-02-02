var post = require("./controllers/post").post();
var user = require("./controllers/user").user();

var routeTable = [
		{
			"route" : "/posts",
			"controller" : post.add,
			"action" : "POST"
		},
		{
			"route" : "/posts",
			"controller" : post.getAll,
			"action" : "GET"
		},
		{
			"route" : "/posts/:id",
			"controller" : post.get,
			"action" : "GET"
		},
		{
			"route" : "/users",
			"controller" : user.add,
			"action" : "POST"
		},
		{
			"route" : "/users",
			"controller" : user.getAll,
			"action" : "GET"
		},
		{
			"route" : "/users/:id",
			"controller" : user.get,
			"action" : "GET"
		},
	];

module.exports.routeTable = routeTable;