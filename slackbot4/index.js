var Botkit = require('botkit')
var Witbot = require('witbot')
var fs = require('fs');


var wit = require('botkit-middleware-witai')({
    token: process.env.wit_token
});

var myFile = 'order.txt';

var windowsJoke = [
'Windows means "Work is never done on Windows systems"',
'Ever noticed how fast Windows runs? Neither did I!',
'Yo Dawg I heard you like Mac, So I broke your Windows',
'Time on your hands? Get Windows!',
'Windows means "Work is never done on Windows systems"',

'What\'s the best of Windows95? The deinstaller!',
'How do Microsoft employees exchange a bulb? Not at all... Bill Gates declares darkness as a standard.',
'Computers are like air conditioners, they stop working properly if you open Windows.',
'What is the difference between Jurassic Park and Microsoft? - One is an over-rated high tech theme park based on prehistoric information and populated mostly by dinosaurs, the other is a Steven Spielberg movie'
]
if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

var myStudents = [
"Nick",
"Tack",
"Nicki",
"Jac",
"Toby",
"Franklin",
"Yui Chin"
];



controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

var witbot = Witbot(process.env.wit_token)



controller.middleware.receive.use(wit.receive);


controller.hears(['hello'],'direct_message,direct_mention,mention',wit.hears,function(bot, message) {

   bot.reply(message, 'Hello there! :wave:');
});

controller.hears(['get_weather'],'direct_message,direct_mention,mention',wit.hears,function(bot, message) {

   bot.reply(message, 'Wait ya! I m getting you the weather');
});

controller.hears(['eaten'],'direct_message,direct_mention,mention',wit.hears,function(bot, message) {

   bot.reply(message, "I''m eating Nasi Lemak for lunch");
});
controller.hears(['windows'], 'direct_message,direct_mention,mention',
	function(bot, message) {

		var randomNumber = Math.floor((Math.random() * windowsJoke.length));
		bot.reply(message, windowsJoke[randomNumber]);
	});



controller.hears(['old,', 'age'], 'direct_message,direct_mention,mention',
	function(bot, message, outcome) {
		console.log("Wit.ai detected entities", message.entities);
		bot.reply(message, 'I am five years old! :) ');
	});

controller.hears(['wod'], 'direct_message,direct_mention,mention',
	function(bot, message) {
		console.log("Wit.ai detected entities", message.entities);
		var randomNumber = Math.floor((Math.random() * myStudents.length));
		bot.reply(message, 'The lovely student that has been selected is '+ myStudents[randomNumber].toString());
	});

controller.hears(['weather_get'], 'direct_message,direct_mention,mention',
	function(bot, message) {
		console.log("Wit.ai detected entities", message.entities);
		bot.reply(message, 'You are asking me to get the weather.. ');
	});

controller.hears(['pizzatime'],['ambient','direct_message', 'direct_mention','mention'],function(bot,message) {
  bot.startConversation(message, askFlavor);
});

askFlavor = function(response, convo) {
  convo.ask("What flavor of pizza do you want?", function(response, convo) {
    convo.say("Awesome.");
    fs.appendFileSync(myFile, response.text + ', ');
    askSize(response, convo);
    convo.next();
  });
}
askSize = function(response, convo) {
  convo.ask("What size do you want?", function(response, convo) {
  	fs.appendFileSync(myFile, response.text + ', ');
    convo.say("Ok.")
    askWhereDeliver(response, convo);
    convo.next();
  });
}
askWhereDeliver = function(response, convo) { 
  convo.ask("So where do you want it delivered?", function(response, convo) {
  	fs.appendFileSync(myFile, response.text + ', ');
    convo.say("Ok! Goodbye.");
    fs.appendFileSync(myFile, '\n');
    convo.next();
  });
}