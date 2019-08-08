// auction starts here !

exports.run = (client, message, args) => {

	const modRole = message.guild.roles.find(role => role.name === "mods");

	if (!modRole) {
		return console.log("The mods role does not exist");
	}

	if (!message.member.roles.has(modRole.id)) {
		return message.reply("You can't use this command. Only Mods can !");     // mods only command
	}

	if (!message.mentions.users.size) {
		return message.reply("you need to tag a user in order to Auction them!");   // to check the mention
	}

  if(!(typeof parseInt(args[1]) === "number" && isFinite(parseInt(args[1])))) {     //to check if args[1] is NaN or infinite.
		return message.reply("Wrong format of input");
	}
  
  client.active.ensure(`${process.env.GUILD_ID}-${process.env.OWNER_ID}`, {       // enmap for current auction datas
			token: 0,
			user:0,
			username:0
		});
  
	if (message.guild) {
		const member = message.mentions.members.first().id;
		const taggedUser = message.mentions.users.first();
		const key = `${message.guild.id}-${member}`;
		const basePrice = args[1];
		console.log("New entry : " + key + " - " + basePrice);
		const check = parseInt(client.active.get(`${process.env.GUILD_ID}-${process.env.OWNER_ID}`, "token"));
    
    if(client.players.has(key)) {
      return message.reply("This player has already been Auctioned before!");
    }

		if(check != 0) {
			console.log(check);
			return message.reply("An Auction is active right now");
		}

		client.players.ensure(`${message.guild.id}-${member}`, {                       // enmap for the player data who has being auctioned
			user: member,
			guild: message.guild.id,
			teamName: 0,
			basePrice: parseInt(args[1]),
			lastBid: 0,
			lastBidder: 0,
			lastBidderId: 0,
		});

		client.active.set(`${message.guild.id}-${process.env.OWNER_ID}`, 1, "token");                       // updating required data
		client.active.set(`${message.guild.id}-${process.env.OWNER_ID}`, key, "user");
		client.active.set(`${message.guild.id}-${process.env.OWNER_ID}`, taggedUser.username, "username");

		const embed = {
			"color": 2879165,
			"timestamp": new Date(),
			"thumbnail": {
				"url": "https://cdn.glitch.com/7970aec0-92b3-44a2-a1d2-0182b1704544%2Fgreen-start-button-png-2.png?v=1562917209376",
			},
			"author": {
				"name": "Auction Started",
				"url": "https://discordapp.com",
				"icon_url": client.user.avatarURL,
			},
			"fields": [
				{
					"name": "Player",
					"value": taggedUser.username,
					"inline": true,
				},
				{
					"name": "Base Price",
					"value": basePrice,
					"inline": true,
				},
			],
		};
		message.channel.send({ embed });
  //Collection.find(x => x.name === "name"
    const channel = client.channels.find(x => x.name === process.env.CHANNEL_NAME);
    channel.send({ embed });
	}
};
