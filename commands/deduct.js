// to deduct credit from an account

exports.run = (client, message, args) => {
	const modRole = message.guild.roles.find(role => role.name === "mods");

	if (!modRole) {
		return console.log("The Mods role does not exist");
	}

	if (!message.member.roles.has(modRole.id)) {
		return message.reply("You can't use this command. Only Auction Master can !");     // mod only command
	}

	if (!message.mentions.users.size) {
		return message.reply("you need to tag a user in order to deduct money from them! stupid ass mod");
	}

	if (!args.length > 0) {
		return message.reply("You must enter an amount");
	}

	console.log(args[1]);
	if(!(typeof parseInt(args[1]) === "number" && isFinite(parseInt(args[1])))) {            // checking NaN or infinite value
		return message.reply("Wrong format of input");
	}

	const amount = parseInt(args[1]);
	const taggedUser = message.mentions.users.first();
	const member = message.mentions.members.first().id;
	const key = `${message.guild.id}-${member}`;

	if(!client.points.has(key)) {
		return message.reply("This account does not exist in RAW world");        // account validation
	}

	const balance = client.points.get(key, "balance");
	if(amount > balance) {
		return message.reply("LOL! This person donsen't have much balance to deduct that amount. Balance = `" + balance + "`");
	}

	const newBalance = (balance - amount);
	client.points.set(key, newBalance, "balance");


	return message.channel.send("Amount deduction was successful of Account : `" + taggedUser.username + "`");

};
