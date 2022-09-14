import { getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import { Interaction } from 'discord.js';
import { client } from '..';
import {
  pauseMusic,
  playMusic,
  resumeMusic,
  skipMusic,
  stopMusic,
} from '../functions/music.functions';

export async function interactionCreate(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  // Info Interactions
  if (interaction.commandName === 'hello') {
    const name = interaction.options.getString('name');
    await interaction.reply(
      'Hi' + (name ? `, ${name}` : '') + '! I love minmaxing!'
    );
  } else if (interaction.commandName == 'multiclass') {
    await interaction.reply('I will be multiclassing into Barbarian AG!');
  } else if (interaction.commandName == 'quest') {
    await interaction.reply('Whatever!');
  }

  // Basic Interactions
  if (interaction.commandName === 'follow') {
    const voice = getUserVoice(interaction);

    if (!voice.channelId) {
      await interaction.reply('You are not in a voice channel, my guy.');
      return;
    }
    await interaction.reply('Joining ' + voice.channel.name + '...');

    joinVoiceChannel({
      channelId: voice.channelId,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
  } else if (interaction.commandName === 'unfollow') {
    const voice = getVoiceConnection(interaction.guildId);
    if (!voice) {
      await interaction.reply('I am not in a voice channel, my guy.');
      return;
    }
    await interaction.reply('Leaving...');
    voice.disconnect();
  }

  // Music Interactions
  if (interaction.commandName === 'play') {
    const voice = getUserVoice(interaction);

    const song = interaction.options.getString('song');
    await interaction.reply('Attempting to add ' + song + ' to queue...');
    playMusic(voice.channel, song);
  } else if (interaction.commandName === 'skip') {
    await interaction.reply('Skipping...');
    skipMusic(interaction.guildId);
  } else if (interaction.commandName === 'stop') {
    await interaction.reply('Stopping...');
    stopMusic(interaction.guildId);
  } else if (interaction.commandName === 'pause') {
    await interaction.reply('Pausing...');
    pauseMusic(interaction.guildId);
  } else if (interaction.commandName === 'resume') {
    await interaction.reply('Resuming...');
    resumeMusic(interaction.guildId);
  }
}

function getUserVoice(interaction: Interaction) {
  const guild = client.guilds.cache.get(interaction.guildId);
  const member = guild.members.cache.get(interaction.member.user.id);
  return member.voice;
}
