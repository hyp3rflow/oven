import { Cook, Ingredient } from '../ast/index.ts';
import {
  createRecursiveDescentParser,
  RecursiveDescentParser,
} from 'https://deno.land/x/pbkit@v0.0.22/core/parser/recursive-descent-parser.ts';

export interface ParseResult<T = Cook> {
  ast: T;
  parser: RecursiveDescentParser;
}

export const parse = (text: string) => {
  const parser = createRecursiveDescentParser(text);

  console.log(acceptIngredient(parser));
};

const identPattern = /^[a-z_][a-z0-9_]*/i;
const contentPattern = /^[^@]/;

const acceptIngredient = (
  parser: RecursiveDescentParser
): Ingredient | undefined => {
  const keyword = parser.accept('@');
  if (!keyword) return;
  parser.expect('{');
  const name = parser.expect(identPattern);
  const bracketClose = parser.expect('}');
  return { start: keyword.start, end: bracketClose.end, name: name.text };
};

const getContentsAndSweepComments = (parser: RecursiveDescentParser) => {

}
