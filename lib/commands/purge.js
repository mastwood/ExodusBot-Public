var Clapp = require('../modules/clapp-discord');
var m = require('../modules/exodusbot-modules/math');

//Purge Function. deletes particularly annoying messages
function purgeFunc(argv, context){

		var recieved = context.msg.channel.fetchMessages({limit: 100})
			.then(recieved =>{
				console.log(`Received ${recieved.size} messages`);
				console.log(context.msg.content + " from channel " + context.msg.channel.id);
				var values = new Array();
				for (var k of recieved.values()) {
				    values.unshift(k);
				}
				for (var c = values.length, n = 0; n < c; n++) {
				  var mes = values[n];
					for(var reaction of mes.reactions){
						if(reaction.me)
							mes.reactions.remove(reaction);
					}
					if( mes.content.startsWith("[Now Playing]")||
						mes.content.startsWith("Error while playing")||
						mes.content.startsWith("I can't find a role with that name")||
						mes.content.startsWith("-eb")||
						mes.content.startsWith("If you want to cancel, type cancel.")){
						console.log("deleting message " + mes.content);
						mes.delete(500);
					}else if(mes.content.includes("https://www.youtube.com/watch?v=")||
							mes.content.includes("https://youtu.be/")){
						if(argv.flags.videos){
							context.bot.guilds.get(context.msg.guild.id)
							   .channels.find(val => val.name == 'videos')
							   .sendMessage(mes.member.user.username + " said at " + m.timeConverter(mes.createdTimestamp) + ": " + mes.content);
							console.log("moving message " + mes.content);
							mes.delete(500);
						}
					}
				}
		});
}
var flagsa = new Clapp.Flag({
	name: 'videos',
	desc: 'videos enabled',
	type: 'boolean',
	default: false,
	alias: 'v'
});
module.exports = new Clapp.Command({
	name: "purge",
	desc: "Clears unwanted messages",
	fn: purgeFunc,
	flags: [flagsa]
});
