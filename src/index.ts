require('dotenv').config();
import { interactionCreate } from './events/interaction-create';
import { voiceStateUpdate } from './events/voice-state-update';
import { ExtendedClient } from './structures/Client';

export const client = new ExtendedClient();

client.start();

client.on('ready', () => {
  console.log('Time to minmax!');
});

client.on('interactionCreate', async (interaction) => {
  interactionCreate(interaction);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  voiceStateUpdate(oldState, newState);
});
