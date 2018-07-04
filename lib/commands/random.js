var Clapp = require('../modules/clapp-discord');
var m = require('../modules/exodusbot-modules/math');

//sends various random things

function randFunc(argv, context){
  if(argv.flags.cs){
    var json = JSON.parse(context.fs.readFileSync('./resources/csmaps.json'));
    var rand = m.getRandomInt(0, json.maps.length);
    context.msg.channel.sendMessage('I CHOOSE: ' + json.maps[rand]);
  }else if(argv.flags.game){
    var json = JSON.parse(context.fs.readFileSync('./resources/games.json'));
    var rand = m.getRandomInt(0, json.games.length);
    context.msg.channel.sendMessage('I CHOOSE: ' + json.games[rand]);
  }else if(argv.flags.coinflip){
    var rand = m.getRandomInt(1,2);
    if(rand = 1)
      context.msg.channel.sendMessage("Heads");
    else
      context.msg.channel.sendMessage("Tails");
  }
  else if(argv.flags.d6){
    var rand = m.getRandomInt(1, 6);
    context.msg.channel.sendMessage(
      '```\n'
      +'\n     -----------      '
      +'\n   -/         -/|      '
      +'\n -/         -/  |      '
      +'\n-----------/    |      '
      +'\n|         |     |    '
      +`\n|    ${rand}    |   -/      `
      +'\n|         | -/-       '
      +'\n|         -/          '
      +'\n----------       '
      +'\n```'
    ).then(botMsg => botmsg.delete(15000));
  }
  else
  {
    context.msg.channel.sendMessage('No option was selected. Valid options are "--cs", "--game", "--coinflip", and "--d6".')
  }
}
var argsRand = [
  new Clapp.Flag({
    name: 'cs',
    desc: 'random cs map',
    type: 'boolean',
    default: false,
    alias: 'c'
  }),
  new Clapp.Flag({
    name: 'game',
    desc: 'random game to play',
    type: 'boolean',
    default: false,
    alias: 'g'
  }),
  new Clapp.Flag({
    name: 'coinflip',
    desc: 'coinflip',
    type: 'boolean',
    default: false,
    alias: 'f'
  }),
  new Clapp.Flag({
    name: 'd6',
    desc: 'diceroll',
    type: 'boolean',
    default: false,
    alias: 's'
  })
];
module.exports = new Clapp.Command({
  name: 'random',
  desc: 'randomly selects things',
  fn: randFunc,
  flags: argsRand
});
