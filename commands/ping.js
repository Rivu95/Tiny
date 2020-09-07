// ping returns pong!

exports.run = (client, message) => {
	message.channel.send("pong! That took " + Math.floor(client.ping) + "ms").catch(console.error);
};
