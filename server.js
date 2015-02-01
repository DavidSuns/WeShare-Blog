var express = require("express");
var bodyParser = require("body-parser");
// var Post = require("./controllers/post");
var table = require("./router").table;
var app = express();
var port = parseInt(process.env.PORT, 10) || 8080;

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
for(var route in table) {
	app.post(route, function(req, res) {
		table[route](req, res);
	});
}
app.listen(port);
