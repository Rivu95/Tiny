// leaders bid goes here !

exports.run = (client, message, args) => {

	const modRole = message.guild.roles.find(role => role.name === "leader");

	if (!modRole) {
		return console.log("The mods role does not exist");
	}

	if (!message.member.roles.has(modRole.id)) {
		return message.reply("Don't be fancy! You are no Leader lol !!");            // leader only command
	}

	if(!args.length > 0) {
		return message.reply("Bruh give an amount! don't pretent to be poor");       // to check if an amount is present 
	}
  
  if(!(typeof parseInt(args[0]) === "number" && isFinite(parseInt(args[0])))) {     //to check if args[1] is NaN or infinite.
		return message.reply("Wrong format of input");
	}

	const key = `${message.guild.id}-${message.author.id}`;                        // creating points enmap key

	if(!client.points.has(key)) {
		return message.reply("You have no accounts to bid !");                       // checking if user has an account
	}
  
  const activeKey = `${message.guild.id}-${process.env.OWNER_ID}`;               // creating active enmap key
	const token = client.active.get(activeKey, "token");
  
  if(token != 1) {
		return message.reply("No Auction is active to Bid");                         // checking token if there is an active auction
	}
               
	const balance = parseInt(client.points.get(key, "balance"));                   // user balance
	console.log("balance = " + balance);
	const lastPlayer = client.active.get(activeKey, "user");                       // last bidded player                        
	const lastBid = parseInt(client.players.get(lastPlayer, "lastBid"));           // last highest bid
	console.log("lastbid = " + lastBid);
	const basePrice = parseInt(client.players.get(lastPlayer, "basePrice"));       // gettibg base price
	const newBid = parseInt(args[0]);
	console.log("newbid = " + newBid);
	const bidderUserName = message.author.username;
	const prevId = client.players.get(lastPlayer, "lastBidderId");
	console.log(prevId + "   :   " + key);

	
	if(prevId === key) {
		console.log(prevId + "   :   " + key);
		return message.reply("You just bidded, get the other Leader a chance. SMH!");      // checking  if the bidder is same as previous
	}
	if(newBid < basePrice) {
		return message.reply("Bid an amount greater than base price");
	}
	if((newBid - lastBid) < 20) {
		return message.reply("Maintain a minimum Increment of 20 in bids!");
	}
	if(balance < newBid) {
		return message.reply("You dont have Sufficient credit to bid that amount! Your balance = `" + balance + "`");
	}
  
  let teamName = "";
  
  if(message.member.roles.has(process.env.TEAM_1)) {
    teamName = "Team 1";
  }
  
  if(message.member.roles.has(process.env.TEAM_2)) {
    teamName = "Team 2";
  }

	client.players.set(lastPlayer, bidderUserName, "lastBidder");    // updating values
	client.players.set(lastPlayer, newBid, "lastBid");
	client.players.set(lastPlayer, key, "lastBidderId");
  client.players.set(lastPlayer, teamName, "teamName");

	message.channel.send("Current highest bidder is `" + message.author.username + "` with amount `" + newBid + "`");
};
