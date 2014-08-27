var express = require('express');
var app = express();



app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var port = process.env.PORT || 8080;
var ip = process.env.IP || "127.0.0.1";



app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

// app.get('/', function(req, res){
//   res.send('hello world');
// })

console.log("Listening on http://" + ip + ":" + port);
app.listen(port, ip);