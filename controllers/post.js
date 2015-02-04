// var bodyParser = require]
var postModel  = require("../model/post.js").Post();
var Post = function(){

};

Post.instance = null;

Post.getInstance = function() {
	if(!Post.instance) {
		Post.instance = new Post();
	}
	return Post.instance; 
}

Post.prototype.add = function(req, res){
	console.log(req.body);
	var data = {
		title : req.body.title,
		content : req.body.content,
		author: req.body.author
	};

	postModel.add(data, function(err, result) {
		if(err) {
			console.log("/post/add insert error");
			res.end();
			return;
		}
		// console.log(result);
		res.send(JSON.stringify(postModel.setSuccess("insert successful" ,result.message)));
		res.end();
	});
};

Post.prototype.getAll = function(req, res) {
	var data = null;
	
	postModel.get(data, function(err, result) {
		if(err) {
			console.log("Error happen when get all post from db");
			res.end();
			return;
		}
		console.log(result);
		res.send(JSON.stringify(postModel.setSuccess("get all successful" ,result)));
		res.end();
	});
};

Post.prototype.get = function(req, res) {
	var id = req.params.id;

	postModel.get(id, function(err, result) {
		if(err) {
			console.log("Error happen when get post from post table by id.");
			res.end();
			return;
		} 
		res.send(JSON.stringify(postModel.setSuccess("get successful by id" ,result)));
		res.end();
	});
};

Post.prototype.delete = function(req, res) {
	var id = req.params.id;

	postModel.delete(id, function(err, result) {
		if(err) {
			console.log("Error happen when delete post from post table by id.");
			res.end();
			return;
		} 
		res.send(JSON.stringify(postModel.setSuccess("delete successful" ,result)));
		res.end();
	});
};

module.exports.post = function(){
	return Post.getInstance();
};


