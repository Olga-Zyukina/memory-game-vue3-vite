import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { STATUS, CARD_IMAGE } from "../constants/data";
import type { ICard, IState } from '../types';
import { getRecord, shuffleAllCards } from "../services/commonService/index";

export const useRootStore = defineStore("root", () => {
  const cardList = ref<ICard | any>([]);
  const state: IState = reactive({
    status: STATUS.READY,
    matches: 0,
    turns: 0,
    lastCard: null,
    record: getRecord(),
  });
  const count = ref(0);
  let timeCounter: number | any;

  function getCards(id: any) {
    let cardItems = CARD_IMAGE.slice(0, id);
    cardItems = [...cardItems, ...cardItems];
    cardList.value = shuffleAllCards(cardItems);
  }

  function startTimeCounter() {
    timeCounter = setInterval(() => {
      increment();
    }, 1000);
  }

  function clearTimeCounter() {
    clearInterval(timeCounter);
  }

  function resetTimer() {
    count.value = 0;
  }

  function increment() {
    count.value++;
  }

  function restart() {
    resetTimer();
    state.status = STATUS.READY;
    state.matches = 0;
    state.turns = 0;
    state.lastCard = null;
    clearTimeCounter();
  }

  return {
    cardList,
    state,
    count,
    timeCounter,
    getCards,
    startTimeCounter,
    clearTimeCounter,
    resetTimer,
    increment,
    restart,
  };
});
