var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('myEvent', function(){
console.log('event fired!!');
});

emitter.emit('myEvent');