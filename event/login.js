var events = require("events");
var emitter = new events.EventEmitter();

var username = "nodejs"
var password = "awsome"

emitter.on("userAdded", function(username, password){

console.log ("New  user" + username);
});

emitter.emit("userAdded", username, password);