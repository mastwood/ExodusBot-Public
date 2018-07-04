var Clapp = require('../modules/clapp-discord');

//me me big boy
function func(argv, context){
  var c = context.msg.channel;
  c.sendMessage("M \nE \nM \nE \nB \nI \nG \nB \nO \nY");
}
module.exports = new Clapp.Command({
  name: 'memebigboy',
  desc: 'me me big boy',
  fn: func
});
