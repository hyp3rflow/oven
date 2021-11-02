import { Cook, Ingredient } from '../ast/index.ts';
import { createParser, Parser, Pattern } from './parser.ts';

export interface ParseResult<T = Cook> {
  ast: T;
  parser: Parser;
}

export const parse = (text: string) => {
  const parser = createParser(text);

  console.log(acceptIngredient(parser));
};

const identPattern = /^[a-z_][a-z0-9_]*/i;

const acceptIngredient = (parser: Parser): Ingredient | undefined => {
  const keyword = parser.accept('@');
  if (!keyword) return;
  parser.expect('{');
  const name = parser.expect(identPattern);
  const bracketClose = parser.expect('}');
  return { start: keyword.start, end: bracketClose.end, name: name.text };
};
