// to credit amount in both accounts.

exports.run = (client, message, args) => {
	const modRole = message.guild.roles.find(role => role.name === "mods");

	if (!modRole) {
		return console.log("The Mods role does not exist");
	}

	if (!message.member.roles.has(modRole.id)) {
		return message.reply("You can't use this command. Only Mods can !");    // mod only command
	}

	if (!args.length > 0) {
		return message.reply("You must enter an amount");
	}
  
  if(!(typeof parseInt(args[0]) === "number" && isFinite(parseInt(args[0])))) {      //to check if args[1] is NaN or infinite.
		return message.reply("Wrong format of input");
	}

	const amount = parseInt(args[0]);

	// Get a filtered list (for this guild only)
	const filtered = client.points.filter(p => p.guild === message.guild.id);
	const toAdd = filtered.filter(data => {
		return message.guild.members.has(data.user);
	});

	toAdd.forEach(data => {
		client.points.math(`${message.guild.id}-${data.user}`, "+", amount, "balance");   // adding balance on every accounts
	});
	return message.channel.send("All accounts are credited with `" + amount + "` !");
};
