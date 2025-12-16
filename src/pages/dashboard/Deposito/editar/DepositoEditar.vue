<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup(props, ctx) {
    const route = useRoute();
    const id = computed(() => route.params.id);

    return {
      id,
    };
  },
};
</script>

<template>
  <div>
    <h1>Hello {{ id }}</h1>
  </div>
</template>
