var express = require('express');
var app = express();


app.use(express.static('bower_components'));
app.use(express.static('app'));

var port = process.env.PORT || 8080;
var ip = process.env.IP || "127.0.0.1";





app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

console.log("Listening on http://" + ip + ":" + port);
app.listen(port, ip);