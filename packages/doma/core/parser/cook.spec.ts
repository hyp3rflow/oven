import { parse } from './cook.ts';

Deno.test('#1', () => {
  parse(`@{abc} adsfasdf`);
});
