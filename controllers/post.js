// var bodyParser = require]
var post  = require("../model/post.js").Post();
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
	// console.log(req.body);
	var data = {
		title : req.body.title,
		content : req.body.content,
		author: req.body.author
	};

	post.add(data, function(err, result) {
		if(err) {
			console.log("/post/add insert error");
			res.end();
			return;
		}
		// console.log(result);
		res.send(JSON.stringify(post.setSuccess("")));
		res.end();
	});
};

module.exports.post = function(){
	return Post.getInstance();
};


