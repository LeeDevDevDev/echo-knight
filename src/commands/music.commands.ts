import { SlashCommandBuilder } from 'discord.js';

export const play = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play a song!')
  .addStringOption((option) => {
    return option
      .setName('song')
      .setDescription('Name the song you want to play! Now!')
      .setRequired(true);
  });

export const skip = new SlashCommandBuilder()
  .setName('skip')
  .setDescription('Skip the current song!');

export const stop = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stop the music!');

export const pause = new SlashCommandBuilder()
  .setName('pause')
  .setDescription('Pause the music!');

export const resume = new SlashCommandBuilder()
  .setName('resume')
  .setDescription('Resume the music!');
