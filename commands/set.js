exports.run = (client, message, args) => {
	
  if(message.author.id != process.env.OWNER_ID) {
    return message.reply("You cant use this command");
  }
  
  if(args.length == 0) {
    return message.reply("You must put name ot team or amount");
  }
  
  const member = message.mentions.members.first().id;
  const key = `${message.guild.id}-${member}`;
  
  if(args[0] === "team") {
    client.players.set(key, `${args[2]} ${args[3]}`, "teamName");
    return message.reply("```successful```");
  }
  
  if(args[0] === "amount") {
    
    if(parseInt(args[2] < 0)) {
      return message.reply("```provide a valid amount pls```");
    }
    
    client.players.set(key, args[2], "lastBid");
    return message.reply("```successful```");
  }
};