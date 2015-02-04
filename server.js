var express = require("express");
var bodyParser = require("body-parser");
// var Post = require("./controllers/post");
var routeTable = require("./router").routeTable;
var app = express();
var port = parseInt(process.env.PORT, 10) || 8000;

// console.log(post);
// var post = Post.post();
// app.defaultConfiguration(function(){
//   app.use(express.methodOverride());
//   app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
//   app.use(app.router);
// });
  app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());

// app.get("/post", function(req,res){
// 	post.add(req, res);
// });
var routeInfo = {};
for(var i = 0; i < routeTable.length; i++) {
	routeInfo = routeTable[i];
	switch (routeInfo.action) {
		case "POST" : 
			app.post(routeInfo.route, routeInfo.controller);
			break;
		case "GET" :
			app.get(routeInfo.route, routeInfo.controller);
			break; 
		case "DELETE" : 
			app.delete(routeInfo.route, routeInfo.controller);
			break;
		default:
			break;
	}
}
app.listen(port);
