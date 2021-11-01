import {
  Command,
  HelpCommand,
} from 'https://deno.land/x/cliffy@v0.20.0/command/mod.ts';

const command = new Command();
await command.name('chef').command('help', new HelpCommand()).parse(Deno.args);
