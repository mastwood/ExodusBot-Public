var Clapp = require('../modules/clapp-discord');

//gives people permission to view secret channels
function givePermissionFunc(argv, context){
  context.msg.member.addRole(context.msg.guild.roles.get(val => val === 'Special Access'));
  context.msg.channel.send("evil laughter");
}
module.exports = new Clapp.Command({
  name: 'givespecial',
  desc: 'you were warned',
  fn: givePermissionFunc
});
