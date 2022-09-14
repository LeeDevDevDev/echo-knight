import { SlashCommandBuilder } from 'discord.js';

export const follow = new SlashCommandBuilder()
  .setName('follow')
  .setDescription('Echo Knight shall follow you!');

export const unfollow = new SlashCommandBuilder()
  .setName('unfollow')
  .setDescription('Echo Knight shall leave the channel!');
