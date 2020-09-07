// to delete all enmap

exports.run = (client, message, args) => {
	
  if(message.author.id != process.env.OWNER_ID) {
    return message.reply("You cant use this command");
  }
  
  if(!args.length > 0) {
    return message.reply("put an argument pls");
  }
  
  if(args[0] == "player") {
    const member = message.mentions.members.first().id;
    const key = `${message.guild.id}-${member}`;
    client.players.delete(key);
    return message.channel.send("```Successful```");
  }
  
  if(args[0] == "leader") {
    const member = message.mentions.members.first().id;
    const key = `${message.guild.id}-${member}`;
    client.points.delete(key);
    return message.channel.send("```Successful```");
  }
  
  if(args[0] == "all") {
    client.points.deleteAll();
    client.players.deleteAll();
    client.active.deleteAll();
    client.signups.deleteAll();
    return message.reply("All Data deleted");
  }
  
};