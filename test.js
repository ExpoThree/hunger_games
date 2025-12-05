import 'dotenv/config';
import {
  Client,
  GatewayIntentBits,
  ChannelType,
  Partials
} from 'discord.js';

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.error('ERROR: TOKEN is not set (process.env.TOKEN is empty).');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel] // use Partials enum
});

// log when the client is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
});

// log every raw message (helps identify what you receive)
client.on('messageCreate', async (message) => {
  try {
    console.log('messageCreate:', {
      author: `${message.author.tag} (${message.author.id})`,
      channelType: message.channel.type,
      isBot: message.author.bot,
      contentPreview: message.content?.slice(0, 80)
    });

    if (message.author.bot) return;

    // check DM
    if (message.channel.type === ChannelType.DM) {
      try {
        await message.reply('Hello! This is an automated response from the bot.');
        console.log('Replied to DM successfully.');
      } catch (err) {
        console.error('Failed to reply to DM:', err);
      }
    }
  } catch (err) {
    console.error('Error in messageCreate handler:', err);
  }
});

// log errors from the client
client.on('error', (err) => console.error('Client error:', err));
client.on('shardError', (err) => console.error('Shard error:', err));

// try logging in and catch auth errors
client.login(TOKEN).catch(err => {
  console.error('Login failed — check token and internet connection:', err);
  process.exit(1);
});
