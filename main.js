import { 
    Client, 
    Events, 
    GatewayIntentBits, 
    SlashCommandBuilder,
    Routes,
    REST } from 'discord.js';

import 'dotenv/config';

import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data.json");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const LOW_MEMBER_ROLE_ID = process.env.LOW_MEMBER_ROLE_ID;

const commands = [
    new SlashCommandBuilder()
        .setName('addname')
        .setDescription('Adds your name for the hunger games event'),

    new SlashCommandBuilder()
        .setName('viewnames')
        .setDescription('View registered names')
].map(command => command.toJSON());


const rest = new REST({ version: '10' }).setToken(TOKEN);

async function registerCommands() {
    await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commands }
    );

    console.log(`Registered commands to guild ${GUILD_ID} (instant).`);
};

await registerCommands();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    
    if (interaction.commandName === 'addname') {
        const userID = interaction.user.id;

        let data = JSON.parse(fs.readFileSync(DATA_FILE));

        if (!data.names.includes(userID)) {
            data.names.push(userID);
            fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
            await interaction.reply(`Your name has been added for the hunger games event, <@${interaction.user.id}>!`);
        }
        else {
            await interaction.reply(`Your name is already registered, <@${interaction.user.id}>!`);
        };
    };

    if (interaction.commandName === 'viewnames') {
        
        if (!interaction.member.roles.cache.has(LOW_MEMBER_ROLE_ID)) {
            return interaction.reply({
                content: "You don't have permission to view this.",
                ephemeral: true
            });
        }

        let data = JSON.parse(fs.readFileSync(DATA_FILE));
        if (!data.names.length) {
            return interaction.reply("No names registered yet.");
        }

        const list = (await Promise.all(
            data.names.map(id => interaction.client.users.fetch(id))
        ))
        .map(u => u.username)
        .join("\n");
        
        await interaction.reply({
            content: `**Registered users for Hunger Games:**\n${list}`,
            ephemeral: true
        });
    };
});

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.login(TOKEN);