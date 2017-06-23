var http = require('http');
var changeCase = require('change-case');


http.createServer(function(req, res){

res.writeHead(200, {'Content-Type': 'text-plain'});
res.end(changeCase.upperCase('Hello Node!'));
}).listen(8080);

console.log('Listening to Port 8080... Press Ctrl-C to dismiss!');