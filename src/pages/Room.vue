<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useRootStore } from "../stores/roots"
import AppHeader from "../components/Header.vue";
import Card from "../components/GameCard.vue";

const rootStore = useRootStore();
const $props = defineProps(["id"]);
const _cardList = computed(() => rootStore.cardList);

onBeforeUnmount(() => {
  rootStore.restart();
});

onMounted(() => {
  rootStore.getCards($props.id);
  rootStore.startTimeCounter();
});

</script>

<template>
  <AppHeader>
    <template #LevelUp>
      <div class="level-up">
        <RouterLink :to="{ name: 'home' }">
          <p>Back</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z" />
          </svg>
        </RouterLink>
      </div>
    </template>
  </AppHeader>
  <div class="container">
    <div class="score-container">
      <div>
        <p>Matches:</p>
        <span>{{ rootStore.state.matches }} of {{ $props.id }}</span>
      </div>
      <div>
        <p>Turns:</p>
        <span>{{ rootStore.state.turns }}</span>
      </div>
      <div>
        <p>Record:</p>
        <span>{{ rootStore.state.record }}</span>
      </div>
    </div>
    <div class="game-container">
      <Card v-for="card of _cardList" :key="card.id" :card="card" :id="$props.id" class="card-container" />
    </div>
    <div class="footer">
      <div>
        <p>Status:</p>
        <span>{{ rootStore.state.status }}</span>
      </div>
      <div>
        <p>Time:</p>
        <span>{{ rootStore.count }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.score-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 10px;
  padding: 15px;
  cursor: pointer;
}

.score-container>div {
  border: 3px double #777;
  border-radius: 5px;
  padding: 5px;
}

.score-container p {
  font-size: 15px;
  font-weight: 700;
  margin: 5px 0;
}

.game-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 10px;
  padding: 15px;
  cursor: pointer;
}

.card-container {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  aspect-ratio: 0.7;
  max-height: 300px;
  cursor: pointer;
}

.level-up {
  height: 20px;
  float: right;
  padding: 15px 20px 0 0;
  cursor: pointer;
}

.level-up p {
  display: inline;
  padding-right: 4px;
  font-weight: 700;
}

.level-up svg {
  width: auto;
  height: 100%;
}

.footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 10px;
  font-size: 14px;
}

.footer p {
  display: inline;
  padding-right: 5px;
}
</style>