// help command

exports.run = (client, message) => {
  
  message.delete(1000);
	
  message.channel.send({
  
  "embed": {
    "title": "Supported Commands",
    "description": "Some commands are for `mods` and some for `Leader`",
    "color": 14692834,
    "author": {
      "name": "prefix = /"
    },
    "fields": [
      {
        "name": "/open (leaders only)",
        "value": "opens a 0 balance account of the user."
      },
      {
        "name": "/bid <amount> (leaders only)",
        "value": "to bid an amount"
      },
      {
        "name": "/balance (leaders only)",
        "value": "shows balance of that user only"
      },
      {
        "name": "/addcredit <amount> (mods only)",
        "value": "to credit an amount in all accounts"
      },
      {
        "name": "/add @mention <amount> (mods only)",
        "value": "add amount to mentioned accouts"
      },
      {
        "name": "/deduct @mention <amount> (mods only)",
        "value": "deduct amount from mentioned accouts"
      },
      {
        "name": "/start @mention <amount> (mods only)",
        "value": "to start an auction",
        "inline": true
      },
      {
        "name": "/end (mods only)",
        "value": "to end that auction",
        "inline": true
      },
      {
        "name": "/accounts",
        "value": "shows all accounts with balance",
        "inline": true
      },
      {
        "name": "/view",
        "value": "shows auction summary",
        "inline": true
      }
        
    ]
  }
});
}