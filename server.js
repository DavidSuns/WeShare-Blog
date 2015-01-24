var express = require("express");
var app = express();
var port = parseInt(process.env.PORT, 10) || 8080;

// app.defaultConfiguration(function(){
//   app.use(express.methodOverride());
//   app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
//   app.use(app.router);
// });

app.listen(port);
