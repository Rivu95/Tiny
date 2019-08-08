exports.run = (client, message) => {
	const key = `${message.guild.id}-${message.author.id}`;
	if(!client.signups.has(key)){
		return message.reply("You have no accounts yet !");   // if only the user has account in the guild
	}

	return message.channel.send(`You currently have ${client.signups.get(key, "th")} credits`);
};