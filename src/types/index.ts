import type { CARD_IMAGE } from "../constants/data";

export type ICardName = (typeof CARD_IMAGE)[number];

export type ICardNumber = {
  id: number;
  value: number;
  image: ICardName;
};

export interface ICard {
  id: string;
  image: ICardName;
  flipped: boolean;
}

export interface IState {
  status: string;
  matches: number;
  turns: number;
  lastCard: ICard | any;
  record: number;
}
