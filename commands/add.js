// to add credit to an account

exports.run = (client, message, args) => {
	const modRole = message.guild.roles.find(role => role.name === "mods");

	if (!modRole) {
		return console.log("The Mods role does not exist");  //if the guilg dosent have the mod role
	}

	if (!message.member.roles.has(modRole.id)) {
		return message.reply("You can't use this command. Only Auction Master can !");  //mods only command
	}

	if (!message.mentions.users.size) {
		return message.reply("you need to tag a user in order to add money to them! stupid ass mod");  //to check if there,s a mention or not
	}

	if (!args.length > 0) {
		return message.reply("You must enter an amount");  //to check if any amount is entered
	}
	console.log(args[1]);
	if(!(typeof parseInt(args[1]) === "number" && isFinite(parseInt(args[1])))) {     //to check if args[1] is NaN or infinite.
		return message.reply("Wrong format of input");
	}

	const amount = parseInt(args[1]);
	const taggedUser = message.mentions.users.first();
	const member = message.mentions.members.first().id;
	const key = `${message.guild.id}-${member}`;                // creating the players points key

	if(!client.points.has(key)) {
		return message.reply("This account does not exist in RAW world");   // to check if the mentioned person has any account
	}

	const balance = client.points.get(key, "balance");            // fetching the balance 

	const newBalance = (balance + amount);
	client.points.set(key, newBalance, "balance");                // updating balance


	return message.channel.send("Amount was successfully credited to Account : `" + taggedUser.username + "`");

};
