// opens a zero balance account when called !

exports.run = (client, message) => {

	const modRole = message.guild.roles.find(role => role.name === "leader");

	if (!modRole) {
		return console.log("The Leader role does not exist");
	}

	if (!message.member.roles.has(modRole.id)) {
		return message.reply("You can't use this command. Only Leaders can !");    // leaders only command
	}

	if (message.guild) {
		const key = `${message.guild.id}-${message.author.id}`;
		console.log("New entry : " + key);
		message.reply("You have Successfully created a Zero Balance Account");

		client.points.ensure(`${message.guild.id}-${message.author.id}`, {        //  creating an enmap key value pair for the user
			user: message.author.id,
			guild: message.guild.id,
			balance: 0,
		});
	}
};
