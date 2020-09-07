// main file starts here !

const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
}, 280000);

client.once("ready", () => {
	console.log("Ready!");
	client.user.setActivity("RAW season 4", { type: "WATCHING" });
});


client.commands = new Enmap();

// enmap for leaders
client.points = new Enmap({
	name: "points",
	fetchAll: true,
	autoFetch: true,
	cloneLevel: "deep"
});

// enmap for players and auction data
client.players = new Enmap({
	name: "players",
	fetchAll: true,
	autoFetch: true,
	cloneLevel: "deep"
});

// enmap for current auction
client.active = new Enmap({
	name: "active",
	fetchAll: true,
	autoFetch: true,
	cloneLevel: "deep"
});

client.signups = new Enmap({
	name: "signups",
	fetchAll: true,
	autoFetch: true,
	cloneLevel: "deep"
});

client.active.ensure(`${process.env.GUILD_ID}-${process.env.OWNER_ID}`, {       // enmap for current auction datas
			token: 0,
			user:0,
			username:0
		});

// command handler

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
	});
});

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split(".")[0];
		console.log(`Attempting to load command ${commandName}`);
		client.commands.set(commandName, props);
	});
});

client.login(process.env.TOKEN);
