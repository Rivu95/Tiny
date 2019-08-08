// All accounts balance !

exports.run = (client, message, args) => {

  if(args [0] === "auction") {
    
	// A filtered list (for this guild only), and convert to an array while we're at it.
	const filtered = client.players.filter(p => p.guild === message.guild.id).array();

	// Sorting it to get the top results.
	const sorted = filtered.sort((a, b) => b.lastBid - a.lastBid);

	// balance of all accounts! (as a nice embed, too!)
	const Discord = require("discord.js");
  message.delete(1000);
  let lineLength = 18;
  let lineLength2 = 32;
  let ret = "Summary";
  ret += "\n*Winner Winner Chicken Dinner!";
  ret += "\n--------------------------------";
  ret += "\nPlayers           WWCD*   Amount";
  ret += "\n--------------------------------";
  
  for (const data of sorted) {
    let self = client.users.get(data.user);
    var name = self.username
    
    if(self.username.length > 16) {
      var splits = self.username.split(" ");
      var name1 = splits[0];
      var splits2 = name1.split("/");
      name = splits2[0];
      console.log(name);
    }    
    console.log(name);
    let diff = lineLength - (name.length);
    ret += `\n${name}`;
    for (let i = 0; i < diff; i++) { ret += " "; }
    
    var bidderTeam = data.teamName.toString();   
    
    ret += `${bidderTeam}`;
    let diff2 = lineLength2 - (lineLength + data.lastBid.toString().length + bidderTeam.length);
    for (let i = 0; i < diff2; i++) { ret += " "; }
    ret += `${data.lastBid}`;
  }
  var n = ret.length;
  return message.channel.send("```"+ret.slice(0,1920)+ "```");
  //return message.channel.send("\n```" +ret.slice(1920,n)+ "```");
  }
  
  
  if(args[0] === "signups"){
    
    const filter= client.signups.filter(p => p.guild === message.guild.id).array();
    const sorted = filter.sort((a, b) => b.th - a.th);
    
    
    let lineLength = 18;
    let ret = "";
    ret += "\nPLAYERS           TH BK AQ GW WW";
    
    for (const data of sorted){
  
      let name = data.playerName.toString();
      let th = data.townHall.toString();
      let bk = data.bk.toString();
      let aq = data.aq.toString();
      let gw = data.gw.toString();
      let ww = data.ww.toString();
      
      ret += `\n${name}`;
      for (let i = 0; i < (lineLength - name.length); i++) { ret += " "; }
      ret += `${th}`;
      ret += ` ${bk}`;
      ret += ` ${aq}`;
      if(parseInt(gw)<10){
        ret += `  ${gw}`;
      }else {
      ret += ` ${gw}`;
      }
      ret += ` ${ww}`;
    
    }
    ret = "```"+ret+"```";
    return message.channel.send({
                              "embed": {
                              "description": ret,
                              "color": 3553598,
                              "author": {
                              "name": "SIGNUP'S DETAILS"
                              }
                            }
                          });
    
  }
  
};
