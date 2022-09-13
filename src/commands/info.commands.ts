import { SlashCommandBuilder } from 'discord.js';

export const hello = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('Talk to the Echo Knight!')
  .addStringOption((option) => {
    return option.setName('name').setDescription('What is your name?');
  });

export const quest = new SlashCommandBuilder()
  .setName('quest')
  .setDescription('Look at quests from the quest board.')
  .addStringOption((option) => {
    return option
      .setName('quest')
      .setDescription('What quest do you want to look at?')
      .setRequired(true)
      .addChoices(
        {
          name: 'Get the sword',
          value: 'sword',
        },
        {
          name: 'Get the shield',
          value: 'shield',
        }
      );
  });

export const multiclass = new SlashCommandBuilder()
  .setName('multiclass')
  .setDescription('Ask him about his plans to multiclass.');
