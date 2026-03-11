export type ICardNumber = {
  id: number;
  value: number;
  image: string;
};
export interface ICard {
  id: string;
  image: string;
  flipped: boolean;
}
export interface IState {
  status: string;
  matches: number;
  turns: number;
  lastCard: ICard | null;
  record: number;
}
