var Botkit = require('botkit')

var wit = require('botkit-middleware-witai')({
    token: process.env.wit_token
});

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

controller.middleware.receive.use(wit.receive);


controller.hears(['hello'],'direct_message',wit.hears,function(bot, message) {

   bot.reply(message, 'Hello there! :wave:');
});
controller.hears(['hi', 'hello', 'howdy'], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'Hello there! :wave:');
});

controller.hears(['wod'],['message_received','direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Don't be mean to then.. they don't need wod");
});

controller.hears(['pizzatime'],['ambient','direct_message'],function(bot,message) {
  bot.startConversation(message, askFlavor);
});

askFlavor = function(response, convo) {
  convo.ask("What flavor of pizza do you want?", function(response, convo) {
    convo.say("Awesome.");
    askSize(response, convo);
    convo.next();
  });
}
askSize = function(response, convo) {
  convo.ask("What size do you want?", function(response, convo) {
    convo.say("Ok.")
    askWhereDeliver(response, convo);
    convo.next();
  });
}
askWhereDeliver = function(response, convo) { 
  convo.ask("So where do you want it delivered?", function(response, convo) {
    convo.say("Ok! Goodbye.");
    convo.next();
  });
}

controller.hears(['love'],['message_received','direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"I love WOD !");
});

