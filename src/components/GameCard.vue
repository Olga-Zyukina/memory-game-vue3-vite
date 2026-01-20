<script setup lang="ts">
import { computed } from "vue";
import { useRootStore } from "../stores/roots"
import { STATUS } from "../constants/data";
import type { ICard } from '../types';
import { commonService } from "../services";

const rootStore = useRootStore();
const $props = defineProps({
  card: { type: Object, default: () => { } },
  id: {
    type: Number,
    default: 2
  }
});

const _cardList = computed(() => rootStore.cardList);

const handleClick = (card: any) => {
  checkFlipped(card);
  checkStatus();
  if (!rootStore.state.lastCard) {
    rootStore.state.lastCard = card;
  } else if (rootStore.state.lastCard !== card && rootStore.state.lastCard.image === card.image) {
    rootStore.state.lastCard = null;
    rootStore.state.turns++;
    rootStore.state.matches++;
    checkAllPaired();
  } else {
    _cardList.value.map((elem: { id: string; image: string; flipped: boolean }) => {
      if (elem.id === rootStore.state.lastCard.id) {
        setTimeout(() => {
          card.flipped = false;
          elem.flipped = false;
        }, 1000)
      }
    });
    rootStore.state.turns++
    rootStore.state.lastCard = null;
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
  if (rootStore.state.status === STATUS.READY) {
    rootStore.state.status = STATUS.PLAYING;
  }
};

const checkAllPaired = () => {
  if (rootStore.state.matches == $props.id) {
    rootStore.state.status = STATUS.PASSED;
    commonService.saveRecord(rootStore.count)
    rootStore.state.record = commonService.getRecord();
    rootStore.clearTimeCounter();
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
