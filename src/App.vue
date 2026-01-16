<script lang="ts">
import { RouterView } from 'vue-router';

export default {
  name: 'App',
};
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
