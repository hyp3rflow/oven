import {
  Command,
  HelpCommand,
} from 'https://deno.land/x/cliffy@v0.20.0/command/mod.ts';
import study from './cmds/study.ts';

const command = new Command();
await command
  .name('chef')
  .command('help', new HelpCommand())
  .command('study', study)
  .parse(Deno.args);
