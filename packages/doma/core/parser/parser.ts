export const eof = Symbol('<EOF>');
export type Pattern = string | RegExp | typeof eof;

export interface Span {
  start: number;
  end: number;
}

export interface Token extends Span {
  text: string;
}

export interface Parser {
  readonly input: string;
  loc: number;
  accept(pattern: Pattern): Token | undefined;
  expect(pattern: Pattern): Token;
}

export const createParser = (input: string): Parser => {
  const parser = {
    input,
    loc: 0,
    accept(pattern: Pattern) {
      if (pattern === eof) return acceptEof();
      if (typeof pattern === 'string') return acceptString(pattern);
      return acceptRegex(pattern);
    },
    expect(pattern: Pattern) {
      const result = parser.accept(pattern);
      if (!result) throw new Error(`Expected pattern: ${pattern.toString()}`);
      return result;
    },
  };

  const acceptEof = (): Token | undefined => {
    if (parser.loc < input.length) return;
    return { start: parser.loc, end: parser.loc, text: '' };
  };

  const acceptString = (pattern: string): Token | undefined => {
    const start = parser.loc;
    const end = start + pattern.length;
    const text = input.slice(start, end);
    if (text !== pattern) return;
    parser.loc = end;
    return { start, end, text };
  };

  const acceptRegex = (pattern: RegExp): Token | undefined => {
    pattern.lastIndex = 0;
    const execArray = pattern.exec(input.slice(parser.loc));
    if (!execArray) return;
    const [text] = execArray;
    const start = parser.loc + execArray.index;
    const end = start + text.length;
    parser.loc = end;
    return { start, end, text };
  };

  return parser;
};
