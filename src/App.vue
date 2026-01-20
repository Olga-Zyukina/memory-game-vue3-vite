<script setup lang="ts">
  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  width: 450px;
  height: 750px;
  margin: 0 auto;
  border: 5px double #000;
  border-radius: 2px;
}
@media screen and (max-width: 450px) {
  .wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
