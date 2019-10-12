const Discord = require("discord.js"); // Discord
const config = require("./Config/keys"); // Config Keys
const client = new Discord.Client(); // Initalizing Discord Client
const fetch = require("node-fetch"); // fetch 

const token = config.botToken;

// Making sure Bot Is Online
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
	if (message.content === "!joke") {
		// fetching joke from api
		fetch("https://geek-jokes.sameerkumar.website/api", {
			method: "GET" // setting request method
		}).then((response) => {
			return response.text() // getting response text
		}).then((response) => {
			message.reply(response + "\nhttps://geek-jokes.sameerkumar.website/api!"); // sending response 
		}).catch((err) => {
			console.log(err); // if error occurs
			message.reply("Ooops an error has occured.")
		})
	}
});

client.login(token);
