import { Client } from 'discord.js';

export const discordClient = new Client();

discordClient.on('ready', () => {
  console.log(`logged in as ${discordClient.user!.tag}`);
});
