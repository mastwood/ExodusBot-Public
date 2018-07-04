var Clapp = require('../modules/clapp-discord');

//in progress music player.
function voicePlayFunc(argv, context){
  var m = context.msg;
  var sender = context.msg.author;
  var voiceChannel = m.member.voiceChannel;
  if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
  voiceChannel.join().then(
    connection => {
      var stream = context.ytdl(argv.args.url, { filter: 'audioonly' });
      var dispatcher = connection.playStream(stream);
      dispatcher.on('end', () => voiceChannel.leave());
    });
}

module.exports = new Clapp.Command({
  name: "voice-play",
  desc: "play audio and stuff",
  fn: voicePlayFunc,
  args:[
    new Clapp.Argument({
      name: "url",
      desc: "url of song",
      type: "string",
      required: false,
      default: ""
    })
  ]
});
