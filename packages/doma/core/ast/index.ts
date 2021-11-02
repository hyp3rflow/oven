import { Span } from '../parser/parser.ts';

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
