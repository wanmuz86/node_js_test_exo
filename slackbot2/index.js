var Bot = require('slackbots')

var settings = {
    token: 'SOME TOKEN',
    name: 'My Bot'
};
var bot = new Bot(settings);

bot.on('start', function() {
    bot.postMessageToChannel('some-channel-name', 'Hello channel!');
    bot.postMessageToUser('some-username', 'hello bro!');
    bot.postMessageToGroup('some-private-group', 'hello group chat!');
});