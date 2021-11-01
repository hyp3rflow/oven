import { Command } from 'https://deno.land/x/cliffy@v0.20.0/command/mod.ts';
import { ensureDir } from 'https://deno.land/std@0.113.0/fs/mod.ts';

interface Options {
  outDir: string;
}

export default new Command()
  .description('Study new recipes.')
  .arguments('<targets...:string>')
  .option('-o, --out-dir <value>', 'Output directory', {
    default: './recipes',
  })
  .action(async (options: Options, targets: string[]) => {
    try {
      await Promise.all(
        targets.map(target =>
          installRecipe(parseTarget(target), options.outDir)
        )
      );
    } catch (e) {
      console.error(e);
    }
  });

interface ChefTarget {
  user: string;
  repo: string;
  path: string;
  version?: string;
}

const parseTarget = (target: string): ChefTarget => {
  const match =
    /(?<user>.+)\/(?<repo>.+)\/(?<path>([^@])+)(@(?<version>.+))?$/.exec(
      target
    );
  if (!match) throw new Error(`Invalid target: ${target}`);
  return match.groups as unknown as ChefTarget;
};

const installRecipe = async (target: ChefTarget, outDir: string) => {
  const { user, repo, path } = target;

  const result = await fetch(
    `https://api.github.com/repos/${user}/${repo}/contents/${path}`
  ).then(res => res.json());
  const blob = await fetch(result.download_url).then(res => res.blob());
  const buffer = await blob.arrayBuffer();
  await ensureDir(outDir);
  await Deno.writeFile([outDir, path].join('/'), new Uint8Array(buffer));
  console.log(`I studied ${path}!`);
};
