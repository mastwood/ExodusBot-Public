var Clapp = require('../modules/clapp-discord');

//this function doesn't work quite right. in progress
//supposed to check who has a certain permission
function whoHasFunc(argv, context){
   var m = context.msg;
   var sender = context.msg.author;
   var peopleWithRole = "";
   m.guild.members.forEach(p =>{
     role = m.guild.roles.find("name", argv.args.role);
     if(role != null && p.roles.has(role.id)){
      peopleWithRole += p.displayName + '\n';
     }
   });
   m.channel.send(peopleWithRole);
}
var whoHasArgs = new Clapp.Argument({
  name: "role",
  desc: "role to search for",
  type: "string",
  required: true,
  default: "Michael"
});
module.exports = new Clapp.Command({
  name: "whohas",
  desc: "Tells you who has what role",
  fn: whoHasFunc,
  args: [whoHasArgs]
});
