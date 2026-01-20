<script setup lang="ts">
</script>

<template>
  <div class="header">
    <h1>Memory Game</h1>
    <slot name="LevelUp"></slot>
  </div>
</template>

<style scoped>
.header {
  margin-top: 10px;
}
h1 {
  display: inline;
}
@media screen and (max-width: 450px) {
  h1 {
    font-size: 27px;
  }
}
</style>
