import type { ICard } from '../../types';

function id(length: number) {
  const result = [];
  const characters = "abcdefghijklmnopqrstuvwxyz_=+";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

export function getRecord() {
  const topScore = sessionStorage.getItem("record");
  if (topScore) {
    return +topScore;
  } else {
    return 99999;
  }
}

export function saveRecord(score: number) {
  const topScore = sessionStorage.getItem("record");
  if (!topScore) {
    return sessionStorage.setItem("record", `${score}`);
  }
  if (+topScore > score) {
    return sessionStorage.setItem("record", `${score}`);
  }
}

export function shuffleAllCards(cards: string[]) {
  const newCards: ICard | any = cards.map((image: string) => ({
    id: id(8),
    image,
    flipped: false,
  }));

  for (let i = newCards.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const x = newCards[i - 1];
    newCards[i - 1] = newCards[j];
    newCards[j] = x;
  }
  return newCards;
}