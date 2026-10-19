import { ref } from "vue";
import { defineStore } from "pinia";
import { CARD_IMAGE } from "../constants/data";
import type { ICard } from '../types';
import { shuffleAllCards } from "../services/commonService/index";

export const useCardsStore = defineStore("cards", () => {
  const cardList = ref<ICard[]>([{ id: "", image: "", flipped: false }]);

  function getCards(id: number) {
    let cardItems: string[]= CARD_IMAGE.slice(0, id);
    cardItems = [...cardItems, ...cardItems];
    cardList.value = shuffleAllCards(cardItems) ;
  }

  return {
    cardList,
    getCards,
  };
});
