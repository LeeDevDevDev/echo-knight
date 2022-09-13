import { Collection, VoiceState } from 'discord.js';
import { client } from '..';

export async function voiceStateUpdate(
  oldState: VoiceState,
  newState: VoiceState
) {
  const channelId = newState.channel.members?.filter(
    (member) => member.user.id === process.env.clientId
  );

  if (!channelId) return;

  if (channelId.size >= 1 && newState.channel.members.size === 1) {
    await client.voice.client.destroy();
  }
}
