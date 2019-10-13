const Discord = require("discord.js"); // Discord
const config = require("./Config/keys"); // Config Keys
const client = new Discord.Client(); // Initalizing Discord Client
const fetch = require("node-fetch"); // fetch 

// Config
const token = config.botToken; // token for bot

// Making sure Bot Is Online
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// When a message is recieved
client.on("message", message => {
	let command = message.content.toLowerCase(); // holding user msg
	if (message.author.username !== "shrek_test") { // making sure the bot does not get stuck in a recursive loop 
		console.log(`${message.author.username} sent a message: '${message.content}'`); // console log - username & msg
		if (command[0] === "!") { // making sure its a valid command
			command = command.slice(1, command.length); // removing esclamation mark
			if (command === "joke") { // joke
				// fetching joke from api
				fetch("https://geek-jokes.sameerkumar.website/api", {
					method: "GET" // setting request method
				}).then((response) => {
					return response.text(); // getting response text
				}).then((response) => {
					message.reply(response + "\nhttps://geek-jokes.sameerkumar.website/api!"); // sending response 
				}).catch((err) => {
					console.log(err); // if error occurs
					message.reply("Ooops an error has occured.");
				})
			} else if (command === "bot_time") { // bot time
				message.reply(new Date().toISOString().toString()); // sending bot time
			} else if (command === "help" || command === "about" || command === "info") { // showing help
				message.reply("Bot - Help \nCommands: \n`!joke` - For a random Joke \n`!bot_time` - For Server Time \n`!help` - to view this help"); // help menu
			}
		} else {
			message.reply("ERROR - Invalid Command"); // if the user did not enter a valid commant
		}
	}

});

client.login(token);
