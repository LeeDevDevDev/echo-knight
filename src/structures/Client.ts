import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { follow } from '../commands/basic.commands';
import { hello, multiclass, quest } from '../commands/info.commands';

export class ExtendedClient extends Client {
  rest = new REST({ version: '10' }).setToken(process.env.botToken);

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });
  }

  start(): void {
    // this.login(process.env.botToken);
    this.registerCommands();
  }

  async registerCommands(): Promise<void> {
    const commands = [
      // import all the commands from info commands
      hello.toJSON(),
      multiclass.toJSON(),
      quest.toJSON(),

      follow.toJSON(),
    ];

    try {
      await this.rest.put(
        Routes.applicationGuildCommands(process.env.clientId, process.env.mgId),
        {
          body: commands,
        }
      );

      this.login(process.env.botToken);
    } catch (err) {
      console.log(err);
    }
  }
}
