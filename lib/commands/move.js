var Clapp = require('../modules/clapp-discord');
var m = require('../modules/exodusbot-modules/math');

//moves messages from one channel to another
function moveFunc(argv, context){

		var recieved = context.msg.channel.fetchMessages({limit: argv.args.number + 1})
			.then(recieved =>{
				console.log(`Received ${recieved.size} messages`);
				console.log(context.msg.content + " from channel " + context.msg.channel.id);
				var values = new Array();
				for (var k of recieved.values()) {
				    values.unshift(k);
				}
				for (var c = values.length, n = 0; n < c; n++) {
				  var mes = values[n];
					if(mes.content.startsWith('-eb')){
						mes.delete();
					}else if(mes.content.startsWith('ExodusBot said at')){
						//todo
					}
					if(!mes.content.startsWith('-eb')){
						context.bot.guilds.get(context.msg.guild.id)
							 .channels.find(val => val.name == argv.args.channel)
							 .sendMessage(mes.member.user.username + " said at " + m.timeConverter(mes.createdTimestamp) + ": " + mes.content);
	          mes.delete();
					}
				}
		});
}
var flagsa = new Clapp.Argument({
	name: 'number',
	desc: 'number of msgs to move',
	type: 'number',
  default: 1
});
var flagsb = new Clapp.Argument({
  name: 'channel',
	desc: 'channel to move to',
	type: 'string',
  default: 'archive'
});
module.exports = new Clapp.Command({
	name: "move",
	desc: "Moves unwanted messages",
	fn: moveFunc,
	args: [flagsa, flagsb]
});
