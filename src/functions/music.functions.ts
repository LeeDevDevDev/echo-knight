import { VoiceBasedChannel } from 'discord.js';
import DisTube, { SearchResult, Song, Playlist } from 'distube';
import { client } from '..';

export async function playMusic(
  voiceChannel: VoiceBasedChannel,
  song: string | SearchResult | Song | Playlist
) {
  await client.distube.play(voiceChannel, song);
}

// export async function that will skip music
export async function skipMusic(guildId: string) {
  await client.distube.skip(guildId);
}

// export async function that will stop music
export async function stopMusic(guildId: string) {
  await client.distube.stop(guildId);
}

// export async function that will pause music
export async function pauseMusic(guildId: string) {
  await client.distube.pause(guildId);
}

// export async function that will resume music
export async function resumeMusic(guildId: string) {
  await client.distube.resume(guildId);
}
