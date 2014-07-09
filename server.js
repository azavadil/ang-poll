var http = require("http");
var handler = require("./request-handler");

var port = process.env.PORT || 8080;
var ip = process.env.IP || "127.0.0.1";
var server = http.createServer();

server.on("request", function(req, res){
  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);

  path.exists(filename, function(exists) {
    if(!exists) {
      utils.sendResponse(res);
      return;
    } else if (uri === '/') {
      filename += 'app/index.html';
    }

    var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
    res.writeHead(200, mimeType);

    var fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);

  });
};


console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);