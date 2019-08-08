const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_TOKEN,
});

exports.run = (client, message, args) => {
  
  if(client.signups.has(`${message.guild.id}-${message.author.id}`)) {
		return message.reply("You are already signed up !");   // if only the user has account in the guild
	}
  
  if(args.length < 2){
    return message.reply("Your Input is wrong. Correct format `/signup <playertag> <weight>` i.e `/signup #UP90LV2V 118`");
  }

  if(!(typeof parseInt(args[1]) === "number" && isFinite(parseInt(args[1])))) {     //to check if args[1] is NaN or infinite.
		return message.reply("You put the weight wrong");
	}
	
  let tagLength = args[0].length;
  let urlTag = args[0].slice(1,tagLength);
  
  //emojis
  const tinyAQ = client.emojis.find(emoji => emoji.name === "tiny_aq");
  const tinyBK = client.emojis.find(emoji => emoji.name === "tiny_bk");
  const tinyGW = client.emojis.find(emoji => emoji.name === "tiny_gw");
  const tinyWW = client.emojis.find(emoji => emoji.name === "tiny_ww");
  const tinyTH = client.emojis.find(emoji => emoji.name === "tiny_th");
  
  //player data using SC API
  clientSc.playerByTag(args[0]).then((response) => {

  let playerName = response['name'];
  let th = parseInt(response['townHallLevel']);
  let clan = response.clan['name'];
    
    if(th < 10){  
      return message.reply("Sorry, we are not taking townhall 9s or below !");
    }
    
    if(weightChecker(th,args[1])){
      return message.reply("Seems like you put the weight wrong or you are engineered! Either way not a valid entry. ");
    }
    
  
    if(th < 11){
      let bk = parseInt(response.heroes[0].level);
      let aq = parseInt(response.heroes[1].level);
      let details = tinyTH+" "+th+ " " +tinyAQ+ " " +aq+" "+tinyBK +" "+bk+ " "+tinyWW +" "+args[1];
      let url = "https://www.clashofstats.com/players/"+playerName+"-"+urlTag+"/history";
      
      //data store from here
      client.signups.ensure(`${message.guild.id}-${message.author.id}`, {                       // enmap for the sign-ups
			user: message.author.id,
			guild: message.guild.id,
      playerName: playerName,
      playerTag: args[0],
			townHall: th,
			bk: bk,
			aq: aq,
			gw: 0,
			ww: args[1],
      leader: "false",
      basePrice: 100
		});
      
      return message.channel.send({
                              "embed": {
                              "title": playerName,
                              "description": details,
                              "url": encodeURI(url),
                              "color": 6088026,
                              "timestamp": new Date(),
                              "author": {
                              "name": "Congrats! You are Signed up."
                              }
                            }
                          });
   
    }
    
    if(th >= 11){
      let bk = parseInt(response.heroes[0].level);
      let aq = parseInt(response.heroes[1].level);
      let gw = parseInt(response.heroes[2].level);
      let details = tinyTH+" "+th+" "+tinyAQ +" "+aq+" " +tinyBK +" "+bk+" "+tinyGW+ " "+gw+" "+tinyWW+" "+args[1];
      let url = "https://www.clashofstats.com/players/"+playerName+"-"+urlTag+"/history";
      
      //data store from here
      client.signups.ensure(`${message.guild.id}-${message.author.id}`, {                       // enmap for the sign-ups
			user: message.author.id,
			guild: message.guild.id,
      playerName: playerName,
      playerTag: args[0],
			townHall: th,
			bk: bk,
			aq: aq,
			gw: gw,
			ww: args[1],
      leader: "false",
      basePrice: basePriceFunction(th),
		});
      
        return message.channel.send({
                              "embed": {
                              "title": playerName,
                              "description": details,
                              "url": encodeURI(url),
                              "color": 6088026,
                              "timestamp": new Date(),
                              "author": {
                              "name": "Congrats! You are Signed up."
                              }
                            }
                          });
      
    }
    
  }).catch(e =>  message.reply("Sorry ,Invalid player Tag !"));

     // function to check of townhalls weights
     function weightChecker(th, ww) {
       let townHall = parseInt(th);
       let weight = parseInt(ww);
       
       if(townHall === 10 && (weight < 80 || weight > 90)){
          return true;
       }
       if(townHall === 11 && (weight < 88 || weight > 110)){
          return true;
       }
       if(townHall === 12 && (weight < 106 || weight > 120)){
          return true;
       }
    return false;
  }
  
  function basePriceFunction(th){
    
    if(th === 11){
      return 150;
    }
    if(th === 12){
      return 200;
    }
    
  }
};


