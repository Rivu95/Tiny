// All accounts balance !

exports.run = (client, message) => {

	// A filtered list (for this guild only), and convert to an array while we're at it.
	console.log(client.points.keyArray());
	const filtered = client.points.filter(p => p.guild === message.guild.id).array();

	// Sorting it to get the top results.
	const sorted = filtered.sort((a, b) => b.balance - a.balance);

	// balance of all accounts! (as a nice embed, too!)
	const Discord = require("discord.js");
  message.delete(1000);
  
  let lineLength = 32;
  let ret = "```\n";
  ret += "Accounts                 Balance";
  
  
  for (const data of sorted) {
    let self = client.users.get(data.user);
    let diff = lineLength - (self.username.length + data.balance.toString().length);
    ret += `\n${self.username}`;
    for (let i = 0; i < diff; i++) { ret += " "; }
    ret += `${data.balance}`;
  }
  
  ret += "```";
	//return message.channel.send({ embed });
  return message.channel.send(ret);
};
