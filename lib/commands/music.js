var Clapp = require('../modules/clapp-discord');

//WORK IN PROGRESS

function musicFunction(argv, context){
  switch(argv.args){
    case 'add':
    break;
    case 'play':
    break;
    case 'join':
    break;
    case 'list':
    break;
    case 'help':
    break;
    case 'stop':
    break;
    case 'pause':
    break;
    case 'resume':
    break;
    default:
    break;
  }
}

var musicArgs = [
  new Clapp.Argument({
    name: 'add',
    desc: 'add a youtube link',
    type: 'string',
    default: ''
  }),
  new Clapp.Argument({
    name: 'play',
    desc: 'play music',
    type: 'string',
    default: ''
  }),
  new Clapp.Argument({
    name: 'join',
    desc: 'join channel',
    type: 'string',
    default: ''
  }),
  new Clapp.Argument({
    name: 'list',
    desc: 'display stuff',
    type: 'string',
    default: ''
  }),
  new Clapp.Argument({
    name: 'help',
    desc: 'ayudar',
    type: 'string',
    default: ''
  }),
  new Clapp.Argument({
    name: 'stop',
    desc: 'stop music',
    type: 'string',
    default: ''
  }),
  new Clapp.Argument({
    name: 'pause',
    desc: 'pause music',
    type: 'string',
    default: ''
  }),
  new Clapp.Argument({
    name: 'resume',
    desc: 'resume music',
    type: 'string',
    default: ''
  })
];
module.exports = new Clapp.Command({
  name: 'music',
  desc: 'music',
  fn: musicFunction,
  args: musicArgs
})
