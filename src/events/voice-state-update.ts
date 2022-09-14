import { getVoiceConnection } from '@discordjs/voice';
import { VoiceState } from 'discord.js';

export async function voiceStateUpdate(
  oldState: VoiceState,
  newState: VoiceState
) {
  disconnectBotOnLeave(oldState);
}

async function disconnectBotOnLeave(oldState: VoiceState) {
  const channel = oldState.channel;

  if (!channel) return;

  if (!channel.members.has(process.env.clientId)) return;

  if (channel.members.size !== 1) return;

  await disconnectBot(oldState);
}

async function disconnectBot(oldState: VoiceState) {
  getVoiceConnection(oldState.guild.id).disconnect();
}
