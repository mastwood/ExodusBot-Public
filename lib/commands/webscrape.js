var Clapp = require('../modules/clapp-discord');

//Webscraper using context.cheerio and context.request
//This function has been edited to preserve anonymity, but the tech is there.
function webscrapeFunc(argv, context){
  if(context.msg.channel.name == 'bot_testing'){
    console.log("--recieved webscrape context.request--");
    console.log("webscrapearg: " + argv.args.webscapearg);
  	var searchurl2 = 'website.com' + argv.args.webscrapearg + '/1';
    if(argv.args.webscrapearg == 'all') searchurl2 = 'otherwebsite.com';
  	let linkm;
    let imglink;
    console.log("searchurl2: " + searchurl2);
  	context.request(searchurl2, function(error, response, html){
  		if(!error){
  			var $ = context.cheerio.load(html);
  			var rand = Math.floor((Math.random() * $('.shm-image-list').children().length));
  			var selector = $('.shm-image-list').children().eq(rand);
        console.log("selector: " + selector.children().first().attr('href'));
  			linkm = "otherwebsite.com" + selector.children().first().attr('href');
        if(selector.children().first().attr('href') == undefined){
          context.msg.channel.sendMessage("nothing found...");
        }else{
        context.request(linkm, function(error, response, html){
      		if(!error){
            console.log("in second context.request now");
      			var $ = context.cheerio.load(html);
      			imglink = $('#Imagemain').children('.blockbody').children().first().attr('src');
            var emb = new context.discord.RichEmbed()
          		.setImage(imglink)
              .setDescription('image');
            context.msg.channel.sendEmbed(emb, 'image', { disableEveryone: true });
      		}
      	});
      }
  		}
  	});
  }
}
var webscrapeArg = new Clapp.Argument({
	name: "webscrapearg",
	desc: "A string to be searched",
	type: "string",
	required: true,
  default: "all"
});
module.exports = new Clapp.Command({
	name: "webscrape",
	desc: "Searches the depths of the internet for spooky images",
	fn: webscrapeFunc,
  args: [webscrapeArg]
});
