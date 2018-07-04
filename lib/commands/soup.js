var Clapp = require('../modules/clapp-discord');

//sends a hilarious comic to the channel :)
function soupFunc(argv, context){
  context.msg.channel.sendFile('./resources/soup.png');
}
module.exports = new Clapp.Command({
  name: 'soup',
  desc: 'soup',
  fn: soupFunc
});
