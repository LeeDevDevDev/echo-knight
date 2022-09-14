import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import DisTube from 'distube';
import { follow, unfollow } from '../commands/basic.commands';
import { hello, multiclass, quest } from '../commands/info.commands';
import { pause, play, resume, skip, stop } from '../commands/music.commands';

export class ExtendedClient extends Client {
  rest = new REST({ version: '10' }).setToken(process.env.botToken);
  distube = new DisTube(this, {
    nsfw: true,
    leaveOnStop: false,
    leaveOnEmpty: false,
  });

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
      unfollow.toJSON(),

      // import all commands from music commands
      play.toJSON(),
      skip.toJSON(),
      stop.toJSON(),
      pause.toJSON(),
      resume.toJSON(),
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
