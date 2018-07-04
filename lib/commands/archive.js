var Clapp = require('../modules/clapp-discord');

//archives messages in the archive channel
module.exports = new Clapp.Command({
  name: "archive",
  desc: "Archives messages",
  fn: (argv, context) => {
    var m = context.msg;
    if(argv.args.num > 0){
      if(m.member.hasPermission("MANAGE_MESSAGES") || m.member.roles.has("Librarian")){
        var recieved = m.channel.fetchMessages({limit: argv.args.num + 1}).then(messages =>{
          var values = new Array();
  				for (var k of recieved.values()) {
  				    values.unshift(k);
  				}
          for (var c = values.length, n = 0; n < c; n++) {
  				  var mes = values[n];
            if(!mes.content.startsWith('-eb')){
              context.bot.guilds.get(m.guild.id)
               .channels.find(val => val.name == 'archive')
               .sendMessage(mes.content);
            }
            else mes.delete();
          }
          m.channel.sendMessage(`Archived ${argv.args.num} messages`);
        })
      }
    }else m.channel.sendMessage("Psyche, thats the wrong numbah!");
  },
  args: [{
    name: "num",
    desc: "number of messages to be archived",
    type: "number",
    required: true,
    default: 0
  }]
});
