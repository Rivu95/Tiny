// end the current Auction

exports.run = (client, message) => {

	const modRole = message.guild.roles.find(role => role.name === "mods");

	if (!modRole) {
		return console.log("The mods role does not exist");
	}

	if (!message.member.roles.has(modRole.id)) {
		return message.reply("only mods can use it !!");            // mods only command
	}
  
	const activeKey = `${message.guild.id}-${process.env.OWNER_ID}`;
	const token = parseInt(client.active.get(activeKey, "token"));
  
	if(token != 1) {
		return message.reply("No active auction going on right now");     // to check if there's an active auction or not
	}

	const playerUserName = client.active.get(activeKey, "username");    // getting enmap datas
	const player = client.active.get(activeKey, "user");
	const bidderName = client.players.get(player, "lastBidder");
	const highestBid = parseInt(client.players.get(player, "lastBid"));
	const highestBidderId = client.players.get(player, "lastBidderId");

	if(highestBidderId === 0) {
		client.active.set(activeKey, 0, "token");
    client.players.set(player, "No One", "lastBidder");
    client.players.set(player, "0000", "lastBid");
		return message.channel.send("```No one (Arya Stark) bidded for " + playerUserName + "```");
	}

	const balance = parseInt(client.points.get(highestBidderId, "balance"));
	const left = (balance - highestBid);
	console.log("balance =" + left);

	client.active.set(activeKey, 0, "token");
	client.points.set(highestBidderId, left, "balance");
  
  const member = client.fetchUser(client.players.get(player, "user"));
  console.log(member);
  //member.id.addRole(client.players.get(player, "teamName")).catch(console.error);
  //console.log(member +" : "+client.players.get(player, "teamName"));

	const embed = {
		"color": 14177041,
		"timestamp": new Date(),
		"thumbnail": {
			"url": "https://cdn.glitch.com/7970aec0-92b3-44a2-a1d2-0182b1704544%2FSold-PNG-Transparent.png?v=1562917662167",
		},
		"author": {
			"name": "Auction Ended",
			"url": "https://discordapp.com",
			"icon_url": client.user.avatarURL,
		},
		"fields": [
			{
				"name": "Player",
				"value": playerUserName,
				"inline": true,
			},
			{
				"name": "Highest Bid",
				"value": highestBid,
				"inline": true,
			},
			{
				"name": "Bidder",
				"value": bidderName,
				"inline": true,
			},
		],
	};
	message.channel.send({ embed });
  const channel = client.channels.find(x => x.name === process.env.CHANNEL_NAME);
  channel.send({ embed });
  
  message.guild.members.get(client.players.get(player, "user")).addRole(message.guild.roles.find(r => r.name === client.players.get(player, "teamName"))).catch(console.error);
};
