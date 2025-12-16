<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const id = computed(() => route.params.id);

console.log(id);
</script>

<template>
  <div>
    <h1>Deu certo {{ id }}</h1>
  </div>
</template>
