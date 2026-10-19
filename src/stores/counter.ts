import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { STATUS } from "../constants/data";
import type { IState } from '../types';
import { getRecord } from "../services/commonService/index";

export const useCounterStore = defineStore("counter", () => {
  const state: IState = reactive({
    status: STATUS.READY,
    matches: 0,
    turns: 0,
    lastCard: null,
    record: getRecord(),
  });
  const count = ref(0);
  let timeCounter: number | undefined;

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
    state,
    count,
    timeCounter,
    startTimeCounter,
    clearTimeCounter,
    resetTimer,
    increment,
    restart,
  };
});
