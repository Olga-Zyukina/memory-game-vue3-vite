<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CARD_NUMBER } from "../constants/data";
import type { ICardNumber } from '../types';
import AppHeader from "../components/Header.vue";

let _numberCards = ref<ICardNumber[] | any>([]);

onMounted(() => {
  _numberCards.value = CARD_NUMBER;
});
</script>

<template>
  <AppHeader />
  <h2>Select Card Number</h2>
  <div class="number-container">
   <div v-for="numberCard in _numberCards">
      <RouterLink :to="{ name: 'room', params: { id: numberCard.value } }">
        <img :src=numberCard.image :key="numberCard.id" :alt="numberCard.value">
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.number-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 10px;
  padding: 15px;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
}
.number-container img {
  width: 100%;
  height: auto;
}
</style>