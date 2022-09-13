import { joinVoiceChannel } from '@discordjs/voice';
import { Interaction } from 'discord.js';
import { client } from '..';

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
    const guild = client.guilds.cache.get(interaction.guildId);
    const member = guild.members.cache.get(interaction.member.user.id);
    const channelId = member.voice.channelId;

    if (!channelId) {
      await interaction.reply('You are not in a voice channel, my guy.');
      return;
    }
    await interaction.reply('Joining ' + member.voice.channel.name + '!');

    joinVoiceChannel({
      channelId: channelId,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
  }
}
