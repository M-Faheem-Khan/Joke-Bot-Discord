const Discord = require("discord.js"); // Discord
const config = require("./Config/keys"); // Config Keys
const client = new Discord.Client(); // Initalizing Discord Client
const fetch = require("node-fetch"); // fetch 
const mongoose = require("mongoose"); // MongoDB - Mongoose

// Schema Model
const Message = require("./Models/message"); // message schema
const Errors = require("./Models/errors"); // message schema

// Config
const token = config.botToken; // token for bot
const mongoUrl = config.mongoURL; // mongodb url

// Connecting to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => {
	console.log('MongoDB Connected...')
}).catch((err) => {
	console.log(err)
});
// setting url parser setting mongoose
mongoose.set('useNewUrlParser', true);

// Making sure Bot Is Online
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// When a message is recieved
client.on("message", message => {
	let command = message.content.toLowerCase(); // holding user msg
	if (message.author.username !== "shrek_test") { // making sure the bot does not get stuck in a recursive loop 
		console.log(`${message.author.username} sent a message: '${message.content}'`); // console log - username & msg

		// Incoming Message
		let data = {
			author: message.author.username,
			message: message.content,
			response: null,
		}

		// Errors
		let errors = {
			author: message.author.username,
			message: message.content,
			error: null
		}

		// LOGIC / COMMANDS
		if (command[0] === "!") { // making sure its a valid command
			command = command.slice(1, command.length); // removing esclamation mark
			if (command === "joke") { // joke
				// fetching joke from api
				fetch("https://geek-jokes.sameerkumar.website/api", {
					method: "GET" // setting request method
				}).then((response) => {
					return response.text(); // getting response text
				}).then((response) => {
					let r = response + "\nhttps://geek-jokes.sameerkumar.website/api!" // sending response 
					data.response = r;
					message.reply(r);
				}).catch((err) => {
					console.log(err); // if error occurs
					errors.error = err;
					message.reply("Ooops an error has occured.");
				})
			} else if (command === "bot_time") { // bot time
				let r = new Date().toISOString().toString();
				data.response = r;
				message.reply(r); // sending bot time
			} else if (command === "help" || command === "about" || command === "info") { // showing help
				let r = "Bot - Help \nCommands: \n`!joke` - For a random Joke \n`!bot_time` - For Server Time \n`!help` - to view this help \n`!coin_toss` - tosses a coin";
				data.response = r;
				message.reply(r); // help menu
			} else if (command === "coin_toss") {
				let toss = Math.floor(Math.random() * 3); // 0 - Heads / 1 - Tails / 2 - Coin Landed in the middle
				if (toss === 0) {
					let r = "Heads";
					data.response = r;
					message.reply(r);
				} else if (toss === 2) {
					let r = "Tails";
					data.response = r;
					message.reply(r);
				} else {
					let r = "Coin landed in the middle";
					data.response = r;
					message.reply(r);
				}
			} else if (command.startsWith("random_number")) { // !random_number 1-10
				let startNum;
				let endNum;
				if (command == "random_number") {
					// default values
					startNum = 0;
					endNum = 10;
				} else {
					// getting the starting
					// starting number 
					command = command.replace("random_number ", "");
					command = command.split("-");
					startNum = parseInt(command[0]);
					endNum = parseInt(command[1]);
				}

				let randomNumber = Math.floor(Math.random() * endNum);
				let r = `Random Number: ${randomNumber}`;
				console.log(r);
				data.response = r;
				message.reply(r);
			}
		} else {
			let r = "ERROR - Invalid Command";
			errors.error = r;
			data.response = r;
			message.reply(r); // if the user did not enter a valid command
		}

		// Saving Incomming
		new Message(data).save().then(() => {
			console.log("Message Logged");
		}).catch((err) => {
			console.log(err);
		});

		if (errors.error !== null) {
			// Saving Error
			new Errors(errors).save().then(() => {
				console.log("Error Logged");
			}).catch((err) => {
				console.log(err);
			})
		}

	}

});

client.login(token);
