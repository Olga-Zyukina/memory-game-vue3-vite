<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "../stores/counter"
import { useCardsStore } from "../stores/cards"
import { STATUS } from "../constants/data";
import type { ICard } from '../types';
import { commonService } from "../services";

const counterStore = useCounterStore();
const cardsStore = useCardsStore();
const $props = defineProps<{
  id: number,
  card: ICard
}>();
const _cardList = computed(() => cardsStore.cardList);

const handleClick = (card: ICard) => {
  checkFlipped(card);
  checkStatus();
  if (!counterStore.state.lastCard) {
    counterStore.state.lastCard = card;
  } else if (counterStore.state.lastCard !== card && counterStore.state.lastCard.image === card.image) {
    counterStore.state.lastCard = null;
    counterStore.state.turns++;
    counterStore.state.matches++;
    checkAllPaired();
  } else {
    _cardList.value.map((elem: { id: string; image: string; flipped: boolean }) => {
      if (elem.id === counterStore.state?.lastCard?.id) {
        setTimeout(() => {
          card.flipped = false;
          elem.flipped = false;
        }, 1000)
      }
    });
    counterStore.state.turns++
    counterStore.state.lastCard = null;
  }
};

const checkFlipped = (card: ICard) => {
  if (card.flipped) {
    return;
  }
  else {
    card.flipped = true;
  }
};

const checkStatus = () => {
  if (counterStore.state.status === STATUS.READY) {
    counterStore.state.status = STATUS.PLAYING;
  }
};

const checkAllPaired = () => {
  if (counterStore.state.matches == $props.id) {
    counterStore.state.status = STATUS.PASSED;
    commonService.saveRecord(counterStore.count)
    counterStore.state.record = commonService.getRecord();
    counterStore.clearTimeCounter();
  }
};

</script>

<template>
  <div :class="['card', { flipped: $props.card.flipped }]" @click="handleClick($props.card)">
    <img :src=$props.card.image :key="$props.card.id" class="front" :alt="$props.card.id">
    <img src="/assets/img/back.jpg" class="back" alt="back">
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card img {
  display: block;
  height: 100%;
  width: auto;
  position: absolute;
  backface-visibility: hidden;
}

.flipped {
  transform: rotateY(180deg);
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card .front {
  transform: rotateY(180deg);
}

.card .back {
  transform: rotateY(0deg);
}
</style>
