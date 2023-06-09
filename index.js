// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config()

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
});

const regex = /<@([0-9]*)> \[upvoted\]\((https:\/\/waifugame\.com\/updrop\/[0-9]*)/;

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageUpdate, (oldMessage, message) => {
	if (message.author.id == '812323565012647997') {
		let description = message.embeds[0].data.description
		if (description) {
			if (description.includes('looking for Encounters')) {
				setTimeout(() => {
					message.channel.send("@here `/wgdrop` cooldown is ready!")
				}, 10800000);
			}
		}
	};
});

client.on(Events.MessageCreate, (message) => {
	if (message.author.id == '812323565012647997') {
		try {
			let description = message.embeds[0].data.description
			if (description.includes('made three Cards drop')) {
				let match = description.match(regex);
				setTimeout(voteDM, 43200000, match[1], match[2]);
			}
		} catch {
			return
		}
  };
});

async function voteDM(user, url) {
	let voteUser = await client.users.fetch(user);
	voteUser.send({
		embeds: [
			{
				description: `[Time to vote!](${url})`,
				color: "15419068"
			}
		]
	})
};


// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
