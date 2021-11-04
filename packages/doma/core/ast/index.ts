import { Span } from 'https://deno.land/x/pbkit@v0.0.22/core/parser/recursive-descent-parser.ts';

export interface Cook {
  statements: Node[];
}

export type Node = Ingredient | String;

export interface Ingredient extends Span {
  name: string;
  amount?: string; // @TODO: Change to Amount
}

export interface String extends Span {
  value: string;
}
